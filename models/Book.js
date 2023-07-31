const { dbConnection } = require('../configuration');
const { bookDataSchema } = require('../validation/bookValidation')
/*
 {id, title, author, edition}
*/
class Book {
  constructor(bookData) {
    this.bookData = bookData;
  }

  static validBookData(bookData) {
      return bookDataSchema.validateAsync(bookData)
  }

   isExist(){
     return new Promise((resolve, reject) => {
       dbConnection((err, db) => {
         db.query(`select id from Book where title = "${this.bookData.title}"`, (err, result) => {
           if (err){
             reject(err);
           }else {
             if (result[0]){
               resolve(true)
             }else{
               resolve(false)
             }
           }
         })
       }).catch(err => reject(err))
     })
  }

  addBook(callback) {
    this.isExist().then(exist => {
      if (!exist){
        dbConnection((err, db) => {
          const insertQuery = `INSERT INTO Book(title,author,edition) VALUES("${this.bookData.title}","${this.bookData.author}", ${this.bookData.edition})`;
          db.query(insertQuery, (err, result) => {
            if (err) {
              return callback(err, undefined)
            } else {
              return callback(null, {status: true, insertedId: result.insertId})
            }
          })
        })
      }else{
        return callback(null, {status: false, statusCode: 400, message: "Book is already exist!"})
      }
    })
  }

  static getAllBooks(page, limit) {
    return new Promise((resolve, reject) => {
      dbConnection((err, db) => {
        if (err){
              reject(err);
        }else {
          const offset = (page - 1) * limit;
          const getQuery = `SELECT * FROM Book LIMIT ${limit} OFFSET ${offset}`; //sql query for get
          db.query(getQuery, (err,result,fields) => {
            if(err){
              reject(err);
            }else{
              if (result.length < 1){
                resolve({status: false, message: "There is no books here..."})
              }else{
                // console.log(fields)
                resolve({status: true, page, count: result.length , result})
              }
            }
          })
        }
      })
    })
  }

  static getBook(id){
    return new Promise((resolve, reject, fields) => {
      dbConnection((err,db) => {
        if (err){
          reject(err);
        }else{
          const getBookQuery = `SELECT * FROM Book WHERE id = ${id}`
          db.query(getBookQuery, (err,result) => {
            if (err){
              reject(err);
            }else{
              if (result.length > 0){
                resolve({status: true, result});
              }else{
                resolve({status: false, message: "book not found!"})
              }
            }
          })
        }
      })
    })
  }

  static deleteBook(id, cb) {
    this.getBook(id).then(result => {
      if (result.status){
        dbConnection((err, db) => {
          if (err){
            return cb(err, undefined);
          }else{
            const deleteQuery = `DELETE FROM Book WHERE id = ${id}`;
            db.query(deleteQuery, (err) => {
              if (err){
                return cb(err, undefined);
              }else{
                return cb(null, {
                  statusCode: 204
                });
              }
            })
          }
        })
      }else{
        cb(null, {statusCode: 404, message: "book not found!"})
      }
    })

  }

  updateBook(id,cb){
    Book.getBook(id).then((result) => {
      if (result.status){
        dbConnection((err, db) => {
          if(err){
            cb(err, undefined);
          }else{
            const updateQuery =
                `UPDATE Book SET title = "${this.bookData.title}", author = "${this.bookData.author}", edition = "${this.bookData.edition}" WHERE id = ${id}`
            db.query(updateQuery, (err) => {
              if (err){
                cb(err, undefined);
              }else{
                cb(null, {status: true, message: `Book with id ${id} updated successfully!`})
              }
            })
          }
        })
      }else{
        cb(null, {status: false, message: "book not found!"})
      }
    }).catch(err => {
      cb(err,undefined)
    })

  }
}

module.exports = Book;

//test
const bookData = {
  title: "BooK Title",
  author: "Book Author",
  edition: 0
}
const book = new Book(bookData);
// book.addBook((err,insertId) => {
//   if (err){
//     console.log(err)
//   }else {
//     console.log(insertId)
//   }
// })

// Book.getAllBooks().then(result => {
//   console.log(result)
// }).catch(err => {
//   console.error(err)
// })

// Book.getBook(1).then(book => {
//   console.log(book)
// }).catch(err => {
//   console.error(err)
// })

// Book.deleteBook(1, (err, result) => {
//   if (err){
//     console.error(err);
//   }else{
//     console.log(result)
//   }
// })

// book.updateBook(2, (err, result) => {
//   if(err){
//     console.error(err);
//   }else{
//     console.log(result)
//   }
// })

// book.isExist().then(exist => {
//   if (exist){
//     console.log("t")
//   }else
//     console.log("f")
// })

//validation
// Book.validBookData(bookData).catch(err => {
//   console.error(err.message)
// })


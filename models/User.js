const { dbConnection } = require('../configuration')
/*
 { id, firstName, lastName, email, password, createdAt }
*/
const { hashSync , compareSync} = require('bcrypt')
class User{
    constructor(userData) {
        this.userData = userData;
    }

    isExist(){
        return new Promise((resolve, reject) => {
            dbConnection((err,db) => {
                if (err){
                    reject(err);
                }else{
                    const query = `SELECT id from \`User\` where email = "${this.userData.email}" LIMIT 1`;
                    db.query(query, (err,result) => {
                        if (err){
                            reject(err);
                        }else{
                            if(result.length > 0){
                                resolve(true);
                            }else{
                                resolve(false);
                            }
                        }
                    });
                }
            }).catch(err => {
                reject(err);
            })
        })
    }

    add(callback){
        this.isExist().then(existence => { //check if user email is exist in db
            if (existence){
                //email is exist
                const err = {status: false, statusCode: 400, message: "User with this email already exist!"} //create error object
                return callback(err, undefined); //return callback with err
            }else{
                //user is not exist
                dbConnection((err, db) => {
                    if (err){
                        return callback(err, undefined); //return callback with err
                    }
                    this.userData.password = hashSync(userData.password, 10);
                    const { firstName, lastName, email, password } = this.userData;
                    const addQuery = `INSERT INTO \`User\`(firstName, lastName, email, password)
                                             VALUES ("${firstName}","${lastName}","${email}","${password}")`
                    db.query(addQuery, (err, result) => {
                        if (err){
                            return callback(err, undefined); //return callback with err
                        }
                        /** adding user succeeded **/
                        return callback(null, {status: true, statusCode: 201, InsertedId: result.insertId})
                    })
                }).catch(err => callback(err, undefined)); //return callback with err
            }
        })
    }

    login(){
        return new Promise((resolve, reject) => {
            this.isExist().catch(err => reject(err))
                .then(existence => {
                    if (existence){
                        dbConnection((err, db) => {
                            if (err) return reject(err);
                            else{
                                const authQuery = `SELECT * FROM \`User\` WHERE email = "${this.userData.email}"`;
                                db.query(authQuery, (err, result) => {
                                    if (err) return reject(err);

                                    const userPassword = result[0].password;
                                    const equal = compareSync(this.userData.password, userPassword);
                                    if (!equal){
                                        return resolve({ status: true, user: result[0]})
                                    }else{
                                        return resolve({ status: false, statusCode: 400, message: "incorrect password!" })
                                    }
                                })
                            }
                        }).catch(err => reject(err));
                    }else{
                        return resolve({ status: false, statusCode: 404, message: "This user is not exist!" })
                    }
                })
        })
    }
}

module.exports = User;

let userData = {
    id: 1, firstName: "Braa", lastName: "Gh", email: "example@gmail.com", password: "12345678Aa"
}
const user = new User(userData);
// user.isExist().then(result => {
//     console.log(result)
// })
// user.login().then().catch(err => {
//     console.log(err)
// })

// user.add((err, result) => {
//     if (err){
//         console.error(err)
//     }else{
//         console.log(result)
//     }
// })

const { Book } = require('../models')
const createError = require('http-errors')
const { cache } = require('../configuration')

const clearCache = () => {
  // Clear the entire cache
  cache.flushAll();
}

/**
 * @desc create new book in db
 * @route POST /api/v1/book
 */
const addBook = (req, res, next) => {
  const bookData = req.body;
  const book = new Book(bookData);
  book.addBook((err, result) => {
    if (err){
      return next(createError(err.statusCode || 500, err.message));
    }else{
      clearCache();
      if (result.status){
        return res.status(201).json(result);
      }else{
        return res.status(result.statusCode).json(result)
      }
    }
  })
};


/**
 * @desc get all books from db
 * @route GET /api/v1/book
 */
const getAllBooks = (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1  || 10;
  Book.getAllBooks(page,limit).then(result => {
      res.status(200).json(result)
  }).catch(err => {
    return next(createError(err.statusCode || 500, err.message));
  })
};

/**
 * @desc get book from db
 * @route GET /api/v1/book/:Id
 */
const getBook = (req, res, next) => {
  const { Id } = req.params;
  Book.getBook(Id).then(result => {
    if (result.status){
      res.status(200).json(result)
    }else{
      res.status(404).json(result)
    }
  }).catch(err => {
    return next(createError(err.statusCode || 500, err.message))
  })
};

/**
 * @desc update book data in db
 * @route PUT /api/v1/book/:Id
 */
const updateBook = (req, res, next) => {
  const { Id } = req.params;
  const bookData = req.body;
  const book = new Book(bookData);
  book.updateBook(Id, (err, result) => {
    if (err){
      return next(createError(err.statusCode || 500, err.message));
    }else{
      clearCache();
      return res.status(200).json(result);
    }
  })
};

/**
 * @desc delete book from db
 * @route DELETE /book/:Id
 */
const deleteBook = (req, res, next) => {
  const { Id } = req.params;
  Book.deleteBook(Id, (err, result) => {
    if (err){
      return next(createError(err.statusCode || 500, err.message));
    }else{
      clearCache();
      return res.status(result.statusCode).json(result);
    }
  })
};

module.exports = {
  addBook,
  getBook,
  getAllBooks,
  updateBook,
  deleteBook,
};

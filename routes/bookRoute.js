const { Router } = require("express");
const { validateBookData, validateBookId } = require('../midllewares/validator')
const { caching, auth } = require('../midllewares') //cache & Auth middlewares
const {
  addBook,
  getBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const bookRouter = Router();
bookRouter.route("/")
    .get(auth, caching, getAllBooks)
    .post(auth, validateBookData,addBook);

bookRouter.route("/:Id", )
    .get(auth, caching, validateBookId, getBook)
    .put(auth, validateBookId, validateBookData, updateBook)
    .delete(auth, validateBookId, deleteBook);

module.exports = bookRouter;

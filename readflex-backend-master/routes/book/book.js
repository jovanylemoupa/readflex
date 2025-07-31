const router = require('express').Router();
const {getBooks, getBookById, deleteBookById, createBook, updateBookById} = require('../../controllers/book/book.controller');

router.get('/', getBooks);
router.get('/:id', getBookById);
router.delete('/:id', deleteBookById);
router.post('/', createBook);
router.put('/:id', updateBookById); // Assuming you want to update a book with the same function
 
module.exports = router;
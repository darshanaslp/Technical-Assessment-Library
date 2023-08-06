const express = require('express');
const routers = express.Router();
const {
    getBooks,
    getBookById,
    getAuthors,
    getAuthorById,
    createAuthor,
    createBook,
    updateBook,
    updateAuthor,
    deleteBook,
    deleteAuthor

} = require('../controller/controller');

// Books
routers.get('/books', getBooks);
routers.get('/book/:id', getBookById);
routers.post('/book', createBook);
routers.put('/book/:id', updateBook);
routers.delete('/book/:id', deleteBook);

// Authors
routers.get('/authors', getAuthors);
routers.get('/author/:id', getAuthorById);
routers.post('/author', createAuthor);
routers.put('/author/:id', updateAuthor);
routers.delete('/author/:id', deleteAuthor);

module.exports = routers;
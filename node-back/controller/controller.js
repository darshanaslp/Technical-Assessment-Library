const Author = require('../models/author');
const Book = require('../models/book');

const getBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const books = await Book.find()
            .populate('author', 'first_name last_name')
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id).populate('author', 'first_name last_name');
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAuthorById = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findById(id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json(author);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createAuthor = async (req, res) => {
    const { first_name, last_name } = req.body;
    try {
        const author = await Author.create({ first_name, last_name });
        res.status(201).json(author);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createBook = async (req, res) => {
    const { name, isbn, author } = req.body;
    try {
        // Check if the author exists
        const existingAuthor = await Author.findById(author);
        if (!existingAuthor) {
            return res.status(404).json({ message: 'Author not found' });
        }

        const book = await Book.create({ name, isbn, author });
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name } = req.body;
    try {
      const updatedAuthor = await Author.findByIdAndUpdate(
        id,
        { first_name, last_name },
        { new: true }
      );
      if (!updatedAuthor) {
        return res.status(404).json({ message: 'Author not found' });
      }
      res.json(updatedAuthor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateBook = async (req, res) => {
    const { id } = req.params;
    const { name, isbn, author } = req.body;
    try {
      // Check if the author exists
      const existingAuthor = await Author.findById(author);
      if (!existingAuthor) {
        return res.status(404).json({ message: 'Author not found' });
      }
  
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { name, isbn, author },
        { new: true }
      );
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBook = await Book.findByIdAndRemove(id);
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBook = await Author.findByIdAndRemove(id);
      if (!deletedBook) {
        return res.status(404).json({ message: 'Author not found' });
      }
      res.json({ message: 'Author deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
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
};
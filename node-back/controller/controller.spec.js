const {
    getBooks
  } = require('./controller');
  
  // Mock the Book and Author models
  jest.mock('../models/book');
  jest.mock('../models/author');
  
  const Book = require('../models/book');
  
  describe('Controller Tests', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
  
    describe('getBooks', () => {
      it('should return a list of books', async () => {
        const books = [
          { _id: '1', name: 'Book 1', isbn: 'ISBN1', author: 'author_id_1' },
          { _id: '2', name: 'Book 2', isbn: 'ISBN2', author: 'author_id_2' }
        ];
        Book.find.mockResolvedValue(books);
  
        const req = {};
        const res = {
          json: jest.fn()
        };
  
        await getBooks(req, res);
  
        expect(res.json).toHaveBeenCalledWith(books);
      });
  
      it('should handle errors', async () => {
        const errorMessage = 'Error fetching books';
        Book.find.mockRejectedValue(new Error(errorMessage));
  
        const req = {};
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        await getBooks(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });
  
  });
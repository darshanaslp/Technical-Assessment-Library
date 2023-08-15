import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const store = createStore({
  state: {
    authors: [],
    books: []
    // Other state properties you might need
  },
  mutations: {
    setAuthors(state, authors) {
      state.authors = authors;
      console.log("sethauthor", authors);
    },
    setAuthor(state, author) {
      state.singleAuthor = author;
    },
    addAuthor(state, author) {
      state.authors.push(author);
    },
    removeAuthor(state, authorId) {
      state.authors = state.authors.filter(author => author._id !== authorId);
    },
    setBooks(state, books) {
      state.books = books;
    },
    setBook(state, book) {
      state.singleBook = book;
    },
    addBook(state, book) {
      state.books.push(book);
    },
    removeBook(state, bookId) {
      state.books = state.books.filter(book => book._id !== bookId);
    },
    // Other mutations for updating state
  },
  actions: {
    async fetchAuthors({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/authors`);
        commit('setAuthors', response.data);
        console.log("fetchAuthors", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getAuthor({ commit }, authorId) {
      try {
        const response = await axios.get(`${API_URL}/author/${authorId}`);
        commit('setAuthor', response.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async addAuthorAction({ commit }, newAuthorData) {
      try {
        const response = await axios.post(`${API_URL}/author`, newAuthorData);
        const addedAuthor = response.data;
        commit('addAuthor', addedAuthor);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async deleteAuthor({ commit }, authorId) {
      try {
        await axios.delete(`${API_URL}/author/${authorId}`);
        commit('removeAuthor', authorId); // Call the corresponding mutation to remove the author from state
      } catch (error) {
        console.log.apply(error);
        throw error;
      }
    },

    async fetchBooks({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/books`);
        commit('setBooks', response.data);
      } catch (error) {
        console.error(error);
      }
    },

    async getBook({ commit }, bookId) {
      try {
        const response = await axios.get(`${API_URL}/book/${bookId}`);
        commit('setBook', response.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async addBook({ commit }, newBookData) {
      try {
        const response = await axios.post(`${API_URL}/book`, newBookData);
        const addBook = response.data;
        commit('addBook', addBook);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async deleteBook({ commit }, bookId) {
      try {
        await axios.delete(`${API_URL}/book/${bookId}`);
        commit('removeBook', bookId); // Call the corresponding mutation to remove the author from state
      } catch (error) {
        console.log.apply(error);
        throw error;
      }
    },

    // Other actions for making API calls
  },
  getters: {
    // Getters to access state properties
  }
});

export default store;
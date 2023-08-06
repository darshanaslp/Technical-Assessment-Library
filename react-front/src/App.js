import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthorTable from './components/AuthorTable';
import AddAuthor from './components/AddAuthor';
import EditAuthor from './components/EditAuthor';
import BookTable from './components/BookTable';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
        <Route path="/" element={<AuthorTable />} />
          <Route path="/authors" element={<AuthorTable />} />
          <Route path="/authors/add" element={<AddAuthor />} />
          <Route path="/authors/edit/:id" element={<EditAuthor />} />
          <Route path="/books" element={<BookTable />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

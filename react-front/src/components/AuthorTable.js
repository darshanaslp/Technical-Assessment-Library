import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAuthors, deleteAuthor } from '../redux/action/authorActions';
import { toast } from 'react-toastify';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const AuthorTable = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors.authors);
  const error = useSelector((state) => state.authors.error);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setShowResults(true); // Show the spinner before fetching data
    dispatch(fetchAuthors())
      .then(() => setShowResults(false)) // Hide the spinner after data is fetched
      .catch((error) => {
        console.error('Error fetching authors:', error);
        toast.error('Error loading  authors');
        setShowResults(false); // Hide the spinner on error
      });
  }, [dispatch]);

  const handleDeleteAuthor = async (id) => {
    try {
      await deleteAuthor(id);
      dispatch(deleteAuthor(id));
      dispatch(fetchAuthors()); // Dispatch the action to fetch authors again after delete
      toast.success('Author deleted successfully');
    } catch (error) {
      console.error('Error deleting author:', error);
      toast.error('Error deleting author');
    }
  };

  const columns = [
    {
      dataField: '_id',
      text: 'ID',
      hidden: true,
    },
    {
      dataField: 'first_name',
      text: 'First Name',
      sort: true,
    },
    {
      dataField: 'last_name',
      text: 'Last Name',
      sort: true,
    },
    {
      text: 'Actions',
      formatter: (cell, row) => (
        <div>
          <Link to={`/authors/edit/${row._id}`} className="btn btn-sm btn-primary mr-2">
            Edit
          </Link>
          <button onClick={() => handleDeleteAuthor(row._id)} className="btn btn-sm btn-danger">
            Delete
          </button>
        </div>
      ),
    },
  ];


  return (
    <div className="container mt-4">
      <h2>Author Table</h2>
      <div className='pb-2'>
        <Link to="/authors/add" className="btn btn-primary pb-2">
          Add Author
        </Link>
      </div>

      {showResults && (
        <div className="d-flex justify-content-center pb-2">
          <div className="spinner-border" role="status"></div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}


      <BootstrapTable
        keyField="_id"
        data={authors}
        columns={columns}
        striped
        hover
        condensed
        bootstrap4
        defaultSorted={[{ dataField: 'first_name', order: 'asc' }]}
        pagination={paginationFactory()}
      />
    </div>
  );
};

export default AuthorTable;


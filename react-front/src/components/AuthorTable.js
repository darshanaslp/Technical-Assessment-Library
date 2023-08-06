import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAuthors, deleteAuthor } from '../redux/action/authorActions';
import { toast } from 'react-toastify';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const AuthorTable = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors.authors);

  useEffect(() => {
    dispatch(fetchAuthors()); // Dispatch the fetchAuthors action to fetch authors
  }, [dispatch]);

  console.log("author details", authors);

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
      <Link to="/authors/add" className="btn btn-primary">
        Add Author
      </Link>

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


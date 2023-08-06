import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addAuthor } from '../redux/action/authorActions';


const AddAuthor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const initialValues = {
    first_name: '',
    last_name: '',
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
  });

 
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Make the API call to add the book
      const addedAuthor = await dispatch(addAuthor(values));

      // Show success message
      resetForm(initialValues);
      toast.success('Author added successfully');
      navigate('/');
    } catch (error) {
      console.error('Error adding Book:', error);
      // Show error message
      toast.error('Error adding Book');
    }
  };


  return (
    <div className="card">
      <div className="card-header">Add New Author</div>
      <div className="card-body">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <Field type="text" name="first_name" className="form-control" />
              <ErrorMessage name="first_name" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <Field type="text" name="last_name" className="form-control" />
              <ErrorMessage name="last_name" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary">Add Author</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddAuthor;
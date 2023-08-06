import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { getAuthorById, updateAuthor } from '../services/api'; // Replace '../services/api' with the actual path to your API services

const EditAuthor = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    // Fetch the author details using the authorId
    getAuthorById(id)
      .then((response) => {
        // Set the fetched author details to the state
        setAuthor(response);
        // Update the initialValues with the fetched author details
        setInitialValues({
          first_name: response.first_name,
          last_name: response.last_name,
        });
      })
      .catch((error) => {
        console.error('Error fetching author details:', error);
      });
  }, [id]);

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
  });

  const handleSubmit = (values) => {
    // Update the author data with the new values
    updateAuthor(id, values)
      .then(() => {
        // Show success message
        toast.success('Author updated successfully');
      })
      .catch((error) => {
        console.error('Error updating author:', error);
        // Show error message
        toast.error('Error updating author');
      });
  };

  return (
    <div className="card">
      <div className="card-header">Edit Author</div>
      <div className="card-body">
        {author ? (
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
              <button type="submit" className="btn btn-primary">Update Author</button>
            </Form>
          </Formik>
        ) : (
          <div>Loading author details...</div>
        )}
      </div>
    </div>
  );
};

export default EditAuthor;
import React, { useEffect,useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, updateBook } from '../redux/action/bookActions';
import { fetchAuthors } from '../redux/action/authorActions';

const EditBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const books = useSelector((state) => state.books.books);

  const authors = useSelector((state) => state.authors.authors);

  const book = books.find((book) => book._id === bookId);

  const [loadingAuthors, setLoadingAuthors] = useState(true);

  useEffect(() => {
    // Fetch the list of books from the backend
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    // Fetch the list of authors from the backend
    dispatch(fetchAuthors())
      .then(() => setLoadingAuthors(false))
      .catch((error) => {
        console.error('Error fetching authors:', error);
        setLoadingAuthors(false);
      });
  }, [dispatch]);

  const initialValues = {
    name: book?.name || '',
    isbn: book?.isbn || '',
    author: book?.author || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    isbn: Yup.string().required('ISBN is required'),
    author: Yup.string().required('Author is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Make the API call to update the book
      const updatedBook = await dispatch(updateBook(bookId, values));

      // Show success message
      resetForm(initialValues);
      toast.success('Book updated successfully');
      navigate('/books');
    } catch (error) {
      console.error('Error updating Book:', error);
      // Show error message
      toast.error('Error updating Book');
    }
  };

  return (
    <div className="card">
      <div className="card-header">Edit Book</div>
      <div className="card-body">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <Field type="text" name="isbn" className="form-control" />
              <ErrorMessage name="isbn" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <Field as="select" name="author" className="form-control">
                  <option value="">Select an author</option>
                  {authors.map((author) => (
                    <option key={author._id} value={author._id}>
                      {`${author.first_name} ${author.last_name}`}
                    </option>
                  ))}
                </Field>
              <ErrorMessage name="author" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Book
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditBook;
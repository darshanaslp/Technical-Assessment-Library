<template>
  <div>
    <div class="container">
      <div class="card">
        <div class="card-header">
          Book List
        </div>
        <div class="card-body">
          <button type="button" class="btn btn-outline-primary"> <router-link class="nav-link"
              to="/add-book">Add New Books</router-link></button>

          <table class="table table-striped">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>ISBN</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book._id">
                <td>{{ book.name }}</td>
                <td>{{ book.isbn }}</td>
                <td>{{ book.author.first_name }} {{ book.author.last_name }}</td>
                <td>
                  <button @click="editBook(book._id)" class="btn btn-primary">Edit</button>
                  <button @click="deleteBookClicked(book._id)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="spinner-border text-success" role="status" v-if="deleteLoaing"></div>
        </div>
      </div>
      <div class="alert alert-success" v-if="successSnackbar">
        <i class="icon">✔️</i>
        Success! Book deleted.
      </div>
      <div class="alert alert-danger" v-if="errorSnackbar">
        <i class="icon">⚠️</i>
        Error deleting book. Please try again.
      </div>
      <div class="progress" v-if="loadingAuthors">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['books'])
  },
  methods: {
    ...mapActions(['fetchBooks', 'deleteBook']),
    async deleteBookClicked(authorId) {
      try {
        this.deleteLoaing = true;
        await this.deleteBook(authorId);
        await this.fetchBooks();
        this.deleteLoaing = false;
        this.successSnackbar = true;
      } catch (error) {
        console.error('Error deleting book:', error);
        this.errorSnackbar = true;
      }
    },
    async editBook(bookId) {
        // Navigate to the edit page with the book's _id
       // this.$router.push({ name: 'edit-book', params: { id: bookId } });
        this.$router.push({ name: 'edit-book', params: { bookId: bookId } }); 
    },
    async loadBooks() {
      this.loadBooks = true;
      try {
        await this.fetchBooks();
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        this.loadBooks = false;
      }
    },
  },
  created() {
    this.loadBooks();
  },
  data() {
    return {
      authorHeaders: [
        { text: 'Book Name', value: 'name' },
        { text: 'ISBN', value: 'isbn' },
        { text: 'Author', value: 'author._id' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      loadingAuthors: false,
      successSnackbar: false,
      errorSnackbar: false,
      deleteLoaing:false,
    };
  }
};
</script>
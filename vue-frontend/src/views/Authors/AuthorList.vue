<template>
  <div>
    <div class="container">
      <div class="card">
        <div class="card-header">
          Author List
        </div>
        <div class="card-body">
          <button type="button" class="btn btn-outline-primary"> <router-link class="nav-link"
              to="/add-author">Authors</router-link></button>

          <table class="table table-striped">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="author in authors" :key="author._id">
                <td>{{ author.first_name }}</td>
                <td>{{ author.last_name }}</td>
                <td>
                  <button @click="editAuthor(author._id)" class="btn btn-primary">Edit</button>
                  <button @click="deleteAuthorClicked(author._id)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="spinner-border text-success" role="status" v-if="deleteLoaing"></div>
        </div>
      </div>
      <div class="alert alert-success" v-if="successSnackbar">
        <i class="icon">✔️</i>
        Success! Author deleted.
      </div>
      <div class="alert alert-danger" v-if="errorSnackbar">
        <i class="icon">⚠️</i>
        Error deleting author. Please try again.
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
    ...mapState(['authors'])
  },
  methods: {
    ...mapActions(['fetchAuthors', 'deleteAuthor']),
    async deleteAuthorClicked(authorId) {
      try {
        this.deleteLoaing = true;
        await this.deleteAuthor(authorId);
        await this.fetchAuthors();
        this.deleteLoaing = false;
        this.successSnackbar = true;
      } catch (error) {
        console.error('Error deleting author:', error);
        this.errorSnackbar = true;
      }
    },
    async loadAuthors() {
      this.loadingAuthors = true;
      try {
        await this.fetchAuthors();
        console.log("load author", this.fetchAuthors)
      } catch (error) {
        console.error('Error fetching authors:', error);
      } finally {
        this.loadingAuthors = false;
      }
    },
  },
  created() {
    this.loadAuthors();
  },
  data() {
    return {
      authorHeaders: [
        { text: 'First Name', value: 'first_name' },
        { text: 'Last Name', value: 'last_name' },
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
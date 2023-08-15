<template>
    <div>
      <h2>Add New Author</h2>
      <form @submit.prevent="addAuthor">
        <div class="form-group">
          <label for="first_name">First Name:</label>
          <input type="text" id="first_name" v-model="newAuthor.first_name" class="form-control" :class="{ 'is-invalid': errors.first_name }">
          <div class="invalid-feedback" v-if="errors.first_name">{{ errors.first_name }}</div>
        </div>
        <div class="form-group">
          <label for="last_name">Last Name:</label>
          <input type="text" id="last_name" v-model="newAuthor.last_name" class="form-control" :class="{ 'is-invalid': errors.last_name }">
          <div class="invalid-feedback" v-if="errors.last_name">{{ errors.last_name }}</div>
        </div>
        <button type="submit" class="btn btn-primary">Add Author</button>
      </form>
  
      <div v-if="success" class="alert alert-success mt-3">
        Author added successfully!
      </div>
      <div v-if="failed" class="alert alert-danger mt-3">
        Failed to add author. Please try again.
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  import router from '@/router';
  
  export default {
    data() {
      return {
        newAuthor: {
          first_name: '',
          last_name: '',
        },
        errors: {},
        success: false,
        failed: false,
      };
    },
    methods: {
    ...mapActions(['addAuthorAction']),
      async addAuthor() {
        this.success = false;
        this.failed = false;
        this.errors = {};
  
        if (!this.newAuthor.first_name.trim()) {
          this.errors.first_name = 'First name is required';
        }
        if (!this.newAuthor.last_name.trim()) {
          this.errors.last_name = 'Last name is required';
        }
  
        if (Object.keys(this.errors).length === 0) {
          try {
            await this.addAuthorAction(this.newAuthor);
            this.success = true;
            // Navigate to the home page
        router.push({ name: 'authors' }); 
          } catch (error) {
            console.error(error);
            this.failed = true;
          }
        }
      },
    },
  };
  </script>
  
  <style>
  /* You can add any custom styles here if needed */
  </style>
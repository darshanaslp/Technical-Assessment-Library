<template>
    <div>
        <h2>{{ isEditMode ? 'Edit Book' : 'Add New Book' }}</h2>
        <form @submit.prevent="submitAction">
            <div class="form-group">
                <label for="name">Book Name:</label>
                <input type="text" id="name" v-model="newBook.name" class="form-control"
                    :class="{ 'is-invalid': errors.name }">
                <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
            </div>
            <div class="form-group">
                <label for="isbn">ISBN:</label>
                <input type="text" id="isbn" v-model="newBook.isbn" class="form-control"
                    :class="{ 'is-invalid': errors.isbn }">
                <div class="invalid-feedback" v-if="errors.isbn">{{ errors.isbn }}</div>
            </div>
            <div class="form-group">
                <label for="author">Author:</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="newBook.author">
                    <option v-for="author in authors" :key="author._id" :value="author._id">
                        {{ author.first_name }} {{ author.last_name }}
                    </option>
                </select>
                <div class="invalid-feedback" v-if="errors.author">{{ errors.author }}</div>
            </div>
            <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Update' : 'Add' }} Book</button>
        </form>

        <div v-if="success" class="alert alert-success mt-3">
            {{ isEditMode ? 'Book updated successfully!' : 'Book added successfully!' }}
        </div>
        <div v-if="failed" class="alert alert-danger mt-3">
            {{ isEditMode ? 'Failed to update book. Please try again.' : 'Failed to add book. Please try again.' }}
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import router from '@/router';

export default {
    props: {
        isEditMode: {
            type: Boolean,
            default: false,
        },
        bookData: {
            type: Object,
            default: () => ({ name: '', isbn: '', author: '' }),
        },
    },
    data() {
        return {
            newBook: { ...this.bookData },
            errors: {},
            success: false,
            failed: false,
        };
    },
    computed: {
        ...mapState(['authors']),
    },
    methods: {
        ...mapActions(['addBook', 'updateBook', 'fetchAuthors']),

        async submitAction() {
            this.success = false;
            this.failed = false;
            this.errors = {};

            if (!this.newBook.name.trim()) {
                this.errors.name = 'Name is required';
            }
            if (!this.newBook.isbn.trim()) {
                this.errors.isbn = 'ISBN is required';
            }

            if (Object.keys(this.errors).length === 0) {
                try {
                    if (this.isEditMode) {
                        await this.updateBook(this.newBook); // Update book action
                    } else {
                        await this.addBook(this.newBook); // Add book action
                    }
                    this.success = true;
                    // Navigate to the appropriate page
                    router.push({ name: 'books' });
                } catch (error) {
                    console.error(error);
                    this.failed = true;
                }
            }
        },
        async loadAuthors() {
            try {
                await this.fetchAuthors();
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        },
    },
    created() {
        this.loadAuthors();
    },
};
</script>

<style>
/* Your styles ... */
</style>
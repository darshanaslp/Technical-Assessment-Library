import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  books: any[] = [];

  constructor(
    private sharedService: SharedServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.sharedService.getBooks().subscribe(
      (response) => {
        this.books = response;
      },
      (error) => {
        console.error('Error fetching authors:', error);
      }
    );
  }

  deleteBook(bookId: string): void {
    this.sharedService.deleteBook(bookId).subscribe(
      (response) => {
        // Remove the deleted author from the list
        this.books = this.books.filter((book) => book._id !== bookId);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Book Delete Successfully',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error delete book',
          confirmButtonText: 'OK'
        }); 
        console.error('Error deleting author:', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  authors: any[] = [];
  tableLoading:boolean;

  constructor(
    private sharedService: SharedServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(): void {
    this.tableLoading = true;
    this.sharedService.getAuthors().subscribe(
      (response) => {
        this.authors = response;
        this.tableLoading = false;
      },
      (error: HttpErrorResponse) => {
        const errorMessage = typeof error.error === 'string' ? error.error : 'Table Loading error';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          confirmButtonText: 'OK'
        });
        console.error('Error fetching authors:', error);
        // Handle the error here, you can show an alert or perform other actions
      }
    );
  }

  deleteAuthor(authorId: string): void {
    this.sharedService.deleteAuthor(authorId).subscribe(
      (response) => {
        // Remove the deleted author from the list
        this.authors = this.authors.filter((author) => author._id !== authorId);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Author Deleted successfully',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error delete author',
          confirmButtonText: 'OK'
        });
        console.error('Error deleting author:', error);
      }
    );
  }

 

}

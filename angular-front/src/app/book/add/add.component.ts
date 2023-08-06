import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  bookForm: FormGroup;
  authors: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAuthors();

    this.bookForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      author: ['', [Validators.required]],
    });
  }

  //get author details
  getAuthors(): void {
    this.sharedService.getAuthors().subscribe(
      (response) => {
        this.authors = response;
      },
      (error) => {
        console.error('Error fetching authors:', error);
      }
    );
  }

  //crete new book
  addBook(): void {
    if (this.bookForm.valid) {
      this.sharedService.createBook(this.bookForm.value).subscribe(
        (response) => {
           // Show success message using SweetAlert2
           Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Book Added Successfully',
            confirmButtonText: 'OK'
          }).then(() => {
            // After user clicks OK, navigate to the author list page
            this.router.navigate(['/books']);
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error adding Books',
            confirmButtonText: 'OK'
          });
         
          console.error('Error adding Book:', error);
        }
      );
    }
  }


}

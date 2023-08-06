import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  bookForm: FormGroup;
  bookId: string;
  authors: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAuthors();

    this.bookForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      author: ['', [Validators.required]],
    });

    // Get the author ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id');
      if (this.bookId) {
        this.getbookDetails();
      }
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

  //get book details and fill form
  getbookDetails(): void {
    // Fetch the author details using the authorId and populate the form
    this.sharedService.getBookById(this.bookId).subscribe(
      (response) => {
        this.bookForm.patchValue({
          name: response.name,
          isbn: response.isbn,
          author: response.author._id
        });
      },
      (error) => {
        console.error('Error fetching author details:', error);
      }
    );
  }

  //edit book details
  editBook(): void {
    if (this.bookForm.valid) {
      this.sharedService.updateBook(this.bookId, this.bookForm.value).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Book Update Successfully',
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
            text: 'Error update book',
            confirmButtonText: 'OK'
          }); 
        }
      );
    }
  }


}

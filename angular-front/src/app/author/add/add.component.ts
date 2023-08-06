import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from '../../shared-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  authorForm: FormGroup;
 

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authorForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
    });
  }

  //create new author
  addAuthor(): void {
    if (this.authorForm.valid) {
      this.sharedService.createAuthor(this.authorForm.value).subscribe(
        (response) => {
          // Show success message using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Author Added Successfully',
            confirmButtonText: 'OK'
          }).then(() => {
            // After user clicks OK, navigate to the author list page
            this.router.navigate(['/']);
          });
        },
        (error) => {
          // Show error message using SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error adding author',
            confirmButtonText: 'OK'
          });
          console.error('Error adding author:', error);
        }
      );
    }
  }

 

}

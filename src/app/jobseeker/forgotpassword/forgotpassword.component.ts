import { Component } from '@angular/core';
import { JobseekerserviceService } from '../../Servicess/jobseekerservice.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../Servicess/toaster.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';


  constructor(
    private jobService: JobseekerserviceService,
    private router: Router,
    private toaster: ToasterService
  ) {}


  // This function will handle the form submission
  onSubmit() {
    if (this.password === this.confirmPassword) { 
      this.jobService.updatePasswordJobseeker(this.email, this.password)
        .subscribe(
          response => {
            this.message = '';
            console.log(response);
            this.toaster.showSuccess('Password updated successfully',"Success");
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
          },
          error => {
            this.message = 'Error updating password. Please try again.';
            console.error(error);
            this.toaster.showError('Please check mail and pasword',"Error");
            this.email = '';
          this.password = '';
          }
        );
    } else {
      this.message = 'Passwords do not match.';
    }
  }

  }



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
  invalidDomain: boolean = false;
  validDomains: string[] = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'edu.com', 'gov.com', 'yopmail.com'];



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

  
  validateDomain(): void {
    const domainPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const match = this.email.match(domainPattern);

    if (match) {
      const enteredDomain = match[1];
      this.invalidDomain = !this.validDomains.includes(enteredDomain);
    } else {
      this.invalidDomain = true; // Flag if the email format is invalid
    }

  }

  }



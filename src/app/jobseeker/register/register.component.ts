import { Component } from '@angular/core';
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = '';
  workStatus: string = '';
  promotions: boolean = false;

  emailExists: boolean = false;  // This will be used to show the "Email already exists" message

  constructor(private jobService: JobseekerserviceService, private router: Router) {}

  // Check if the email exists
  checkEmail(): void {
    if (this.email) {
      this.jobService.checkEmailExists(this.email).subscribe({
        next: (response) => {
          this.emailExists = response.exists; // If email exists, set emailExists to true
        },
        error: (error) => {
          console.error('Error checking email:', error);
          this.emailExists = false; // Reset emailExists on error
        }
      });
    }
  }

  // Registration method
  register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const jobseeker = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      workStatus: this.workStatus,
      promotions: this.promotions
    };

    // Call the service to register the job seeker
    this.jobService.registerJobSeeker(jobseeker).subscribe(
      response => {
        console.log('Registration successful', response);
        alert('JobSeeker Registration successful');
        this.router.navigate(['/jobseeker/jfrontpage']);
      },
      error => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    );
  }
}

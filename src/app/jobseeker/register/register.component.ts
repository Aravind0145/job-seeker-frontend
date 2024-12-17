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

  invalidDomain: boolean = false;

  hasOnlySpaces: boolean = false;

  emailExists: boolean = false;  // This will be used to show the "Email already exists" message

  validDomains: string[] = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'edu.com', 'gov.com', 'yopmail.com'];

   
  constructor(private jobService: JobseekerserviceService, private router: Router) {}

  // Check if the email exists
  checkEmail(): void {
    this.emailExists = false;      // Reset previous email existence check
    this.invalidDomain = false;    // Reset previous domain validation

    if (this.email) {
      // Perform custom domain validation
      this.validateDomain();

      if (!this.invalidDomain) {
        // Call the service to check if the email already exists
        this.jobService.checkEmailExists(this.email).subscribe({
          next: (response) => {
            this.emailExists = response.exists;
          },
          error: (error) => {
            console.error('Error checking email:', error);
            this.emailExists = false; // Reset emailExists on error
          }
        });
      }
    }
  }

  validateDomain(): void {
    const domainPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const match = this.email.match(domainPattern);

    if (match) {
      const enteredDomain = match[1];
      if (!this.validDomains.includes(enteredDomain)) {
        this.invalidDomain = true;
      }
    } else {
      this.invalidDomain = true;
    }
  
  }

  validateFullName() {
    this.hasOnlySpaces = this.fullName.trim().length === 0 && this.fullName.length > 0;
  }

  restrictToDigits(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  validatePhoneLength(): void {
    if (this.phone.length > 10) {
      this.phone = this.phone.slice(0, 10);
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

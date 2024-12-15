import { Component } from '@angular/core';
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from '../../toaster.service';

@Component({
  selector: 'app-jobseekerregister',
  templateUrl: './jobseekerregister.component.html',
  styleUrl: './jobseekerregister.component.css'
})
export class JobseekerregisterComponent {
  

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



   
  constructor(private jobService: JobseekerserviceService, private router: Router,    private toaster:ToasterService) {}

  // Check if the email exists
  checkEmail() {
    this.emailExists = false;
    this.invalidDomain = false;
  
    if (this.email) {
      console.log('Email entered:', this.email);
      this.validateDomain();
  
      if (this.invalidDomain) {
        console.log('Invalid domain');
      } else {
        console.log('Valid domain, checking if email exists...');
        this.jobService.checkEmailExists(this.email).subscribe({
          next: (response) => {
            console.log('Email check response:', response);
            this.emailExists = response.exists;
          },
          error: (error) => {
            console.error('Error checking email:', error);
          }
        });
      }
    }
  }

  validateDomain(): void {
    // Regular expression to match a valid email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const match = this.email.match(emailPattern);
  
    if (match) {
      const enteredDomain = match[1];
      if (!this.validDomains.includes(enteredDomain)) {
        this.invalidDomain = true;
      } else {
        this.invalidDomain = false; // Reset the flag if the domain is valid
      }
    } else {
      this.invalidDomain = true; // Flag if the email format is invalid
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
  register(event: Event) {
    event.preventDefault()
    console.log("registration started")
    if(this.emailExists){
    }

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
        this.toaster.showSuccess('Job Seeker Registration Successful!', 'Success'); // Success toast
        this.fullName = '';
    this.email = '';
    this.password = '';
    this.phone = '';
    this.workStatus = '';
    this.promotions = false;
      
      },
      error => {
        console.error('Registration failed:', error);
        this.toaster.showError('Registration failed!', 'Error'); // Error toast
      }
    );
  }
  
  

}

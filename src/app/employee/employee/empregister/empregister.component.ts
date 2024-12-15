import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeserviceService } from '../../../jobseeker/employeeservice.service';
import { Employee } from '../../../employee';
import { ToasterService } from '../../../toaster.service';

@Component({
  selector: 'app-empregister',
  templateUrl: './empregister.component.html',
  styleUrl: './empregister.component.css'
})
export class EmpregisterComponent {
  companyName: string = '';
  websiteUrl: string = '';
  industryType: string = '';
  fullName: string = '';
  officialEmail: string = '';
  mobileNumber: string = '';
  designation: string = '';
  password: string = '';
  confirmPassword: string = '';


  emailExists: boolean = false;
  hasOnlySpacesCompany: boolean = false;
  hasOnlySpaces: boolean = false;

  invalidDomain: boolean = false;



  validDomains: string[] = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'edu.com', 'gov.com', 'yopmail.com'];





  constructor(private empService: EmployeeserviceService, private router: Router,private toaster:ToasterService) { }

  checkEmail(): void {
    this.validateDomain();  // Validate domain whenever the email is checked
    if (this.officialEmail) {
      this.empService.checkEmailExists(this.officialEmail).subscribe({
        next: (response) => {
          this.emailExists = response.exists;  // Update flag based on response
        },
        error: (error) => {
          console.error('Error checking email:', error);
        }
      });
    }
  }

  empregister() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const employee: Employee = {
      companyName: this.companyName,
      websiteUrl: this.websiteUrl,
      industryType: this.industryType,
      fullName: this.fullName,
      officialEmail: this.officialEmail,
      mobileNumber: this.mobileNumber,
      designation: this.designation,
      password: this.password
    };
    

    this.empService. registerEmployee(employee).subscribe(
      response => {
        console.log('Registration successful', response);
        this.toaster.showSuccess("Registration successful","Success");
      },
      error => {
        console.error('Registration failed:', error);
        this.toaster.showError("Registration failed","Error");
      }
    );
  }


  validateCompanyName(): void {
    // Check if the company name contains only spaces
    this.hasOnlySpacesCompany = this.companyName.trim().length === 0 && this.companyName.length > 0;
  }

  
  validateFullName() {
    this.hasOnlySpaces = this.fullName.trim().length === 0 && this.fullName.length > 0;
  }

  
  validateDomain(): void {
    const domainPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const match = this.officialEmail.match(domainPattern);

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
  validatePhoneLength(): void {
    // Ensure that the phone number is only 10 characters long
    if (this.mobileNumber && this.mobileNumber.length > 10) {
      this.mobileNumber = this.mobileNumber.slice(0, 10);
    }
  }
  restrictToDigits(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  
}




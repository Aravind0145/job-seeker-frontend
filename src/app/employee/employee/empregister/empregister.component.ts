import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeserviceService } from '../../../employeeservice.service';
import { Employee } from '../../../employee';

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




  constructor(private empService: EmployeeserviceService, private router: Router) { }

  checkEmail(): void {
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
        alert('Employee Registration successful');
        this.router.navigate(['/employee/emplogin']); 
      },
      error => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    );
  }
}




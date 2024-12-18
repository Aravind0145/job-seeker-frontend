import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeserviceService } from '../../../Servicess/employeeservice.service';
import { ToasterService } from '../../../Servicess/toaster.service';

@Component({
  selector: 'app-empforgotpassword',
  templateUrl: './empforgotpassword.component.html',
  styleUrl: './empforgotpassword.component.css'
})
export class EmpforgotpasswordComponent {

  
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';
  invalidDomain: boolean = false;
  validDomains: string[] = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'edu.com', 'gov.com', 'yopmail.com'];



  constructor(
    private empService: EmployeeserviceService,
    private router: Router,
    private toaster: ToasterService
  ) {}


  // This function will handle the form submission
  onSubmit() {
    if (this.password === this.confirmPassword) { 
      this.empService.updatePasswordEmployee(this.email, this.password)
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
            this.message = '';
            this.toaster.showError('Please cehck mail or password',"Error");
            console.error(error);
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

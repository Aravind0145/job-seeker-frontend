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




}

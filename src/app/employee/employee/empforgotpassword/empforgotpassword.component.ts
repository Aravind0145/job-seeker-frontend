import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeserviceService } from '../../../employeeservice.service';

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
    private router: Router
  ) {}


  // This function will handle the form submission
  onSubmit() {
    if (this.password === this.confirmPassword) { 
      this.empService.updatePasswordEmployee(this.email, this.password)
        .subscribe(
          response => {
            this.message = 'Password updated successfully!';
            console.log(response);
            alert('Password Updated Successfully');
            this.router.navigate(['/employee/emplogin']); 
          },
          error => {
            this.message = 'Error updating password. Please try again.';
            console.error(error);
          }
        );
    } else {
      this.message = 'Passwords do not match.';
    }
  }




}

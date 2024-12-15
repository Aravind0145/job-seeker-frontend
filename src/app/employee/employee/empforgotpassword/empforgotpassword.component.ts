import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeserviceService } from '../../../jobseeker/employeeservice.service';
import { ToasterService } from '../../../toaster.service';

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
            this.router.navigate(['/emplogin']); 
          },
          error => {
            this.message = '';
            this.toaster.showError('Error updating password',"Error");
            console.error(error);
          }
        );
    } else {
      this.message = 'Passwords do not match.';
    }
  }




}

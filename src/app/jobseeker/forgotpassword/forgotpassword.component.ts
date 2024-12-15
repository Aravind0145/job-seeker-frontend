import { Component } from '@angular/core';
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../toaster.service';

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
            this.message = 'Password updated successfully!';
            console.log(response);
            this.toaster.showSuccess('Password updated successfully',"Success");
            this.router.navigate(['/jfrontpage']); 
          },
          error => {
            this.message = 'Error updating password. Please try again.';
            console.error(error);
            this.toaster.showError('Error updating password',"Error");
            this.email = '';
          this.password = '';
          }
        );
    } else {
      this.message = 'Passwords do not match.';
    }
  }

  }



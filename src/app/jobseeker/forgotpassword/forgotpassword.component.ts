import { Component } from '@angular/core';
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}


  // This function will handle the form submission
  onSubmit() {
    if (this.password === this.confirmPassword) { 
      this.jobService.updatePasswordJobseeker(this.email, this.password)
        .subscribe(
          response => {
            this.message = 'Password updated successfully!';
            console.log(response);
            alert('Password Updated Successfully');
            this.router.navigate(['/jobseeker/jfrontpage']); 
          },
          error => {
            this.message = 'Error updating password. Please try again.';
            console.error(error);
            alert('Incorrect email please check it');
            this.email = '';
          this.password = '';
          }
        );
    } else {
      this.message = 'Passwords do not match.';
    }
  }

  }



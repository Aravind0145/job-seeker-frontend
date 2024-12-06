import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeserviceService } from '../../../employeeservice.service';

@Component({
  selector: 'app-emplogin',
  templateUrl: './emplogin.component.html',
  styleUrl: './emplogin.component.css'
})
export class EmploginComponent {

  startHiring() {
    alert('Redirecting to Naukri hiring platform!');
    // Add logic here to navigate or open the hiring platform
  }


  email: string = '';
  password: string = '';


  
  constructor(
    private jobService: EmployeeserviceService,
    private router: Router
  ) {}

  login() {

    if (this.email && this.password) {
      // Perform login action (e.g., call authentication API)
      console.log('Logging in with:', this.email, this.password);
    } else {
      console.log('Form is invalid');
    }
    console.log('User entered email:', this.email);
    console.log('User entered password:', this.password);

    this.jobService.employeelogin(this.email, this.password).subscribe(
      response => {
        const role = response.role;
        const fullName = response.fullName;
        const id = response.id;
        console.log('User role:', role);

        if (role === 'employee') {
          console.log('Navigating to admin dashboard');
          this.router.navigate(['/employee/emphomepage'], {
            queryParams: { fullName,id }
          });        } else {
          console.log('Invalid role');
          alert('Incorrect Email and password');
        }
      },
      error => {
        console.error('Login error:',error);
        alert('Incorrect mail and password Please check! ');
        this.email = '';
      this.password = '';
      }
    );
  }





}

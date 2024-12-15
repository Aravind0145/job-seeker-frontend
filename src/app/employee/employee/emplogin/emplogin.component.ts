import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeserviceService } from '../../../jobseeker/employeeservice.service';
import { ToasterService } from '../../../toaster.service';

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
    private router: Router,
    private toaster: ToasterService
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
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', role);
        localStorage.setItem('fullName', fullName);
        localStorage.setItem('id', String(id));


        if (role === 'employee') {
          console.log('Navigating to admin dashboard');
          this.toaster.showSuccess("loggedInSuccessfull",'Success')
          this.router.navigateByUrl('/emphomepage', {
            state: { fullName, id }
          });  
               } else {
          console.log('Invalid role');
          alert('Incorrect Email and password');
        }
      },
      error => {
        console.error('Login error:',error);
        this.toaster.showError("Invalid Email and password","Error");
        this.email = '';
      this.password = '';
      }
    );
  }





}

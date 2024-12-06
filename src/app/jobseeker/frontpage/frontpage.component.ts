import { Component } from '@angular/core';
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrl: './frontpage.component.css'
})
export class FrontpageComponent {
  showLoginForm: boolean = false; // Controls login form visibility
  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;

  toggleLoginForm(): void {
    this.showLoginForm = !this.showLoginForm; // Toggle the form visibility
  }

  
  constructor(
    private jobService: JobseekerserviceService,
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

    this.jobService.jobseekerlogin(this.email, this.password).subscribe(
      response => {
        const role = response.role;
        const fullName = response.fullName;
        const id = response.id;
        console.log('User role:', role);

        if (role === 'jobseeker') {
          console.log('Navigating to admin dashboard');
          this.router.navigate(['/jobseeker/jobseekerhomepage'], {
            queryParams: { fullName,id }
          });        } else {
          console.log('Invalid role');
          alert('Access denied');
        }
      },
      error => {
        console.error('Login error:', error);
        alert('Incorrect password or email please check it');
        this.email = '';
      this.password = '';
      }
    );
  }
  onSearchClick(event: Event): void {
    event.preventDefault(); // Prevent form submission if needed
    if (!this.isLoggedIn) {
      alert('Please login');
    } else {
      console.log('Proceeding with search...');
      // Add logic for search functionality here
    }
  }




}

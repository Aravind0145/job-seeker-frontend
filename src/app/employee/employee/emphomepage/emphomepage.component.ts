import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeserviceService } from '../../../Servicess/employeeservice.service';

@Component({
  selector: 'app-emphomepage',
  templateUrl: './emphomepage.component.html',
  styleUrl: './emphomepage.component.css'
})
export class EmphomepageComponent implements OnInit {
  fullName: string = '';
  id: number | null = null; // Allow null as a valid type
  isHomeActive: boolean = false;
  currentUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobseekerService: EmployeeserviceService // Inject the service
  ) {}

  ngOnInit(): void {
    // Get the name and id from query params
    const state = history.state;

  // Set fullName and id from the state or default values if not available
  this.fullName = state?.fullName || 'Guest'; // Use optional chaining to avoid errors if state is undefined
  console.log("fullName:", this.fullName);
  
  this.id = state?.id || null; // Set id as null if not available in the state
  console.log("id:", this.id);
  }

  navigateToHomePage(): void {
    this.isHomeActive = true;
    this.router.navigateByUrl('/emphomepage', {
      
      state: { fullName: this.fullName, id: this.id }
    });
  }

  navigateToPostJobsPage(): void {
    this.router.navigateByUrl('/postjobs', {
      state: { fullName: this.fullName, id: this.id }
    });
  }

  navigateToViewJobPostings(): void {
    this.router.navigateByUrl('/viewjobpostings', {
      state: { fullName: this.fullName, id: this.id }
    });
  }

  navigateToProfile(): void {
    this.router.navigateByUrl('/employeeprofile', {
      state: { fullName: this.fullName, id: this.id }
    });
  }
  
  navigateToUpdateProfile(): void {
    this.router.navigateByUrl('/employeeupdateprofile', {
      state: { fullName: this.fullName, id: this.id }
    });
  }
  
  
  

  // Method to fetch resumes using the jobseekerService
  
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    localStorage.removeItem('id');
    this.router.navigateByUrl('/jfrontpage');
  }
}


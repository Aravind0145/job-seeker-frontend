import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeserviceService } from '../../../employeeservice.service';

@Component({
  selector: 'app-emphomepage',
  templateUrl: './emphomepage.component.html',
  styleUrl: './emphomepage.component.css'
})
export class EmphomepageComponent implements OnInit {
  fullName: string = '';
  id: number | null = null; // Allow null as a valid type

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobseekerService: EmployeeserviceService // Inject the service
  ) {}

  ngOnInit(): void {
    // Get the name and id from query params
    this.route.queryParams.subscribe(params => {
      this.fullName = params['fullName'] || 'Guest'; // If 'fullName' is not present, set it as 'Guest'
      this.id = params['id'] ? +params['id'] : null; // Convert 'id' to number if it exists, otherwise set it to null
      console.log('Welcome user:', this.fullName);
      console.log('Job Seeker ID:', this.id); // Log the id
    });
  }

  // Method to fetch resumes using the jobseekerService
  
  logout(): void {
    // Clear local storage and navigate to the front page
    localStorage.removeItem('jobseeker');
    this.router.navigate(['jobseeker/jfrontpage']);
  }
}


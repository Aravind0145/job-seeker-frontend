import { Component, OnInit } from '@angular/core';
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { Jobseeker } from '../../jobseeker';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  jobseeker: Jobseeker | null = null; // To store the jobseeker data
  id: number | null = null; // Jobseeker ID from queryParams
  showSearch: boolean = false; // Flag to toggle search visibility
  resumeId: number | null = null; // To store the resume ID
  fullName: string = ''; // Full name of the jobseeker

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobseekerService: JobseekerserviceService
  ) {}

  ngOnInit(): void {
    // Retrieve query parameters when the component initializes
    this.route.queryParams.subscribe(params => {
      this.fullName = params['fullName'] || 'Guest'; // Set fullName from queryParams or default to 'Guest'
      this.id = params['id']; // Get jobseeker ID from query params

      if (this.id !== null) {
        this.getJobSeekerProfile(this.id); // Fetch the jobseeker profile if id is available
        this.getResumeDetails(this.id); // Fetch the resume details if id is available
      }
    });
  }

  // Toggle the visibility of the search form
  toggleSearch() {
    console.log('Toggling search visibility');
    this.showSearch = !this.showSearch;
  }

  // Fetch the jobseeker profile by id
  getJobSeekerProfile(id: number): void {
    this.jobseekerService.getJobSeekerProfile(id).subscribe(
      (data: Jobseeker) => {
        this.jobseeker = data; // Set the retrieved jobseeker data
        console.log('Jobseeker profile fetched successfully:', data);
      },
      (error) => {
        console.error('Error fetching job seeker profile:', error);
      }
    );
  }

  // Fetch the resume details by id
  getResumeDetails(id: number): void {
    this.jobseekerService.getResumeById(id).subscribe(
      (data) => {
        // Ensure that the data.id is a valid number, otherwise set resumeId to null
        this.resumeId = data.id !== undefined ? data.id : null;
        console.log('Resume details fetched successfully:', data);
      },
      (error) => {
        console.error('Error fetching resume details:', error);
      }
    );
  }
  
  // Logout and navigate to the front page
  logout(): void {
    localStorage.removeItem('jobseeker'); // Remove jobseeker data from local storage
    this.router.navigate(['/jobseeker/jfrontpage']); // Navigate to jobseeker front page
  }
}

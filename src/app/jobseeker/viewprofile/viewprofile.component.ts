import { Component, OnInit } from '@angular/core';
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { Jobseeker } from '../../jobseeker';
import { ActivatedRoute, Router } from '@angular/router';
import { Resume } from '../../resume';

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
  resume: Resume | null = null;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobseekerService: JobseekerserviceService
  ) {}

  ngOnInit(): void {
    // Retrieve state data passed with navigateByUrl()
    const state = history.state;
  
    if (state) {
      this.fullName = state['fullName'] || 'Guest';  // Get fullName from state or default to 'Guest'
      this.id = state['id'];  // Get jobseeker ID from state
      this.resumeId = state.resumeId || null;

      console.log("resumeId",this.resumeId);
  
      if (this.id !== null) {
        this.getJobSeekerProfile(this.id);  // Fetch jobseeker profile if id is available
      }
      if (this.resumeId !== null) {
        this.getResumeDetails(this.resumeId); // Call getResumeDetails if resumeId exists
      }
    } else {
      console.warn('No state data found.');
    }
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
  getResumeDetails(resumeId: number): void {
    this.jobseekerService.getResumeById(resumeId).subscribe(
      (data: Resume) => {
        this.resume = data;
        console.log('Resume details fetched successfully:', data);
      },
      (error) => {
        console.error('Error fetching resume details:', error);
      }
    );
  }
  
  navigateToHomePage(): void {
    this.router.navigateByUrl('/jobseekerhomepage', {
      state: { fullName: this.fullName, id: this.id }
    });
  }
  
  
  navigateToResumePage(): void {
    // Make sure fullName and id are available
    console.log('Navigating with:', { fullName: this.fullName, id: this.id });
  
    // Use navigateByUrl to pass state
    this.router.navigateByUrl('/jobseekerresume', {
      state: { fullName: this.fullName, id: this.id }
    });
  }
  navigateToUpdateResumePage(): void {
    this.router.navigateByUrl('/updateresume', {
      state: { fullName: this.fullName, id: this.id, resumeId: this.resume?.id }
    });
  }

  navigateToViewResumePage(): void {
    this.router.navigateByUrl('/viewresume', {
      state: { fullName: this.fullName, id: this.id, resumeId: this.resume?.id }
    });
  }
  
  
  navigateToJobsAppliedPage(): void {
    this.router.navigateByUrl('/applyjobs', {
      state: { fullName: this.fullName, id: this.id,resumeId: this.resume?.id }
    });
  }
  navigateToViewProfile(): void {
    this.router.navigateByUrl('/viewprofile', {
      state: { fullName: this.fullName, id: this.id,resumeId: this.resume?.id}
    });
  }
  
  navigateToUpdateProfile(): void {
    this.router.navigateByUrl('/updateprofile', {
      state: { fullName: this.fullName, id: this.id,resumeId: this.resume?.id }
    });
  }
  
  // Logout and navigate to the front page
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    localStorage.removeItem('id');
    this.router.navigateByUrl('/jfrontpage');
  }
}

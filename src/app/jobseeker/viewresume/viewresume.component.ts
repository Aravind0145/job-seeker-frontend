import { Component, OnInit } from '@angular/core';
import { Resume } from '../../resume'; // Ensure the path to the Resume model is correct
import { ActivatedRoute, Router } from '@angular/router';
import { JobseekerserviceService } from '../../jobseekerservice.service';

@Component({
  selector: 'app-viewresume',
  templateUrl: './viewresume.component.html',
  styleUrls: ['./viewresume.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class ViewresumeComponent implements OnInit {
  fullName: string = '';
  resume: Resume | null = null; // Holds the resume details
  showSearch: boolean = false; // Toggle search form visibility
  id: number | null = null;
  resumeId: number | null = null; // Added resumeId to store the resume's ID

  constructor(
    private route: ActivatedRoute,
    private jobseekerService: JobseekerserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve state data passed with navigateByUrl()
    const state = history.state;
  
    if (state) {
      this.fullName = state.fullName || 'Guest';
      this.id = state.id || null;
      this.resumeId = state.resumeId || null;
  
      console.log('Full Name:', this.fullName);
      console.log('ID:', this.id);
      console.log('Resume ID:', this.resumeId);
  
      if (this.resumeId) {
        this.getResumeDetails(this.resumeId); // Fetch resume details
      } else {
        console.error('No resumeId found.');
      }
    } else {
      console.warn('No state data found.');
    }
  }
  

  toggleSearch(): void {
    console.log('Toggling search visibility');
    this.showSearch = !this.showSearch; // Toggle the visibility of search form
  }

  getResumeDetails(id: number): void {
    // Fetch resume details by ID
    this.jobseekerService.getResumeById(id).subscribe(
      (data: Resume) => {
        this.resume = data; // Set the retrieved resume data
        this.resumeId = data.id !== undefined ? data.id : null; // Ensure resumeId is set
        console.log('Resume fetched successfully:', data);
      },
      (error) => {
        console.error('Error fetching resume:', error);
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
      state: { fullName: this.fullName, id: this.id,resumeId: this.resume?.id }
    });
  }
  
  navigateToUpdateProfile(): void {
    this.router.navigateByUrl('/updateprofile', {
      state: { fullName: this.fullName, id: this.id,resumeId: this.resume?.id }
    });
  }
  

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    localStorage.removeItem('id');
    this.router.navigateByUrl('/jfrontpage');
  }
}

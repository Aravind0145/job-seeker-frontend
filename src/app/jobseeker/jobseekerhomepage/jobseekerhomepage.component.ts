import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resume } from '../../Interfaces/resume';
import { JobseekerserviceService } from '../../Servicess/jobseekerservice.service';
import { Jobpostings } from '../../Interfaces/jobpostings';
import { JobseekerSharedService } from '../../Servicess/jobseeker-shared.service';

@Component({
  selector: 'app-jobseekerhomepage',
  templateUrl: './jobseekerhomepage.component.html',
  styleUrls: ['./jobseekerhomepage.component.css']
})
export class JobseekerhomepageComponent implements OnInit {
  jobTableVisible = true; // Initially set to true to show the table
  jobpostings: Jobpostings[] = [];
  searchJobPostings: Jobpostings[] = []; // New array for search results
  fullName: string = '';
  id: number | null = null;
  resume: Resume | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;
  isBlurred: boolean = false; 
  searchCriteria = {
    jobTitle: '',
    location: '',
    experience: 0,
  };

  showSearch: boolean = false;
  isHomeActive: boolean = false;
  currentUrl: string = '';
  resumeExists: boolean = false; // Track if resume already exists

  constructor(
    private router: Router,
    private jobseekerService: JobseekerserviceService,
    private jobseekerSharedService : JobseekerSharedService
  ) {}
  
  ngOnInit(): void {
    const state = history.state;
  
    this.fullName = state.fullName || 'Guest';
    console.log("fullName:",this.fullName);
    this.id = state.id || null;
    console.log("id:",this.id)
    if (this.id !== null) {
      this.getResume(this.id);
      this.jobseekerService.checkResumeExistence(this.id).subscribe({
        next: (exists: boolean) => {
          this.resumeExists = exists;
          console.log('Resume Exists:', this.resumeExists);
  
          if (this.resumeExists) {
            // Fetch resume details if a resume exists
          } else {
            console.log('No resume found, ready to create a new one');
          }
        },
        error: (error) => {
          console.error('Error checking resume existence:', error);
        }
      });
    }
  
    this.getJobPostings();
    
    
  }
  

  getResume(id: number): void {
    this.jobseekerService.getResume(id).subscribe(
      (data) => {
        if (data) {
          this.resume = data;
          this.fullName = `${data.firstName} ${data.middleName} ${data.lastName}`.trim();
        } else {
          console.error('No resume data found');
        }
      },
      (error) => {
        console.error('Error fetching resume:', error);
      }
    );
  }

  getJobPostings(): void {
    this.jobseekerService.getJobPostings(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        this.jobpostings = response.data;
        this.totalPages = Math.ceil(response.totalCount / this.itemsPerPage);
      },
      error: (err) => {
        console.error('Error fetching job postings:', err);
      }
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getJobPostings();
    }
  }

  toggleSearch(): void {
    this.isBlurred = !this.isBlurred; //
    this.showSearch = !this.showSearch; // Toggle the visibility of search form
  }

  viewJobDetails(job: Jobpostings): void {
    this.router.navigateByUrl('/jobdetails', {
      state: {
        jobData: job,           // Passing the job object directly
        fullName: this.fullName,
        id: this.id,
        resumeId: this.resume?.id,
      },
    });
  }
  

  searchJobs(): void {
    this.jobseekerService.searchJobs(this.searchCriteria).subscribe(
      (data) => {
        this.searchJobPostings = data;  // Store the search results in searchJobPostings
      },
      (error) => {
        console.error('Error fetching job postings:', error);
      }
    );
  }

  hideJobTable(): void {
    this.jobTableVisible = false; // Hide the table
    this.showSearch = false;
    this.isBlurred = false;
  }

  
  navigateToHomePage(): void {
    this.isHomeActive = true;
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
    // Clear all stored user data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    localStorage.removeItem('id');
    this.router.navigateByUrl('/jfrontapge');
  }
  
}

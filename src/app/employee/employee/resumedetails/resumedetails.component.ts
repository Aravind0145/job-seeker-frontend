import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse
import { EmployeeserviceService } from '../../../employeeservice.service';
import { Resume } from '../../../resume';

@Component({
  selector: 'app-resumedetails',
  templateUrl: './resumedetails.component.html',
  styleUrls: ['./resumedetails.component.css']
})
export class ResumedetailsComponent implements OnInit {
  fullName: string = '';
  id: number | null = null;
  resumes: Resume[] = [];
  jobPostingId: number | null = null;
  isHomeActive: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private empService: EmployeeserviceService
  ) {}

  ngOnInit(): void {
    const state = history.state;
  
    if (state) {
      // Retrieve data from the state
      this.fullName = state.fullName || 'Guest'; // Default to 'Guest' if not present
      this.id = state.id || null; // Use 'id' from state, or null if not available
      this.jobPostingId = state.jobPostingId || null; // Use 'jobPostingId' from state, or null if not available
  
      console.log('Full Name:', this.fullName);
      console.log('Employee ID:', this.id);
      console.log('Job Posting ID:', this.jobPostingId);
  
      // Call fetchResumeDetails if jobPostingId is available
      if (this.jobPostingId !== null) {
        this.fetchResumeDetails(this.jobPostingId);
      }
    } else {
      console.error('State is not available.');
    }
  }
  
  

  fetchResumeDetails(jobPostingId: number): void {
    this.empService.getResumesByJobPostingId(jobPostingId).subscribe(
      (resumes: Resume[]) => {
        if (resumes && resumes.length > 0) {
          this.resumes = resumes;
          console.log('Resumes fetched:', resumes);
        } else {
          console.log('No resumes found for this job posting.');
          // Optionally, show a message to the user (e.g., via a toast or modal)
        }
      },
      (error: HttpErrorResponse) => { // Explicitly typing the error
        console.error('Error fetching resume details:', error.message);
        // Optionally, show an error message to the user
      }
    );
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
  
  
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    localStorage.removeItem('id');
    this.router.navigateByUrl('/jfrontpage');
  }
}

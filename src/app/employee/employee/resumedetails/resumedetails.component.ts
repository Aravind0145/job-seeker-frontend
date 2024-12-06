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

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private empService: EmployeeserviceService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.fullName = params.get('fullName') || 'Guest'; // Default to 'Guest' if not present
      const idParam = params.get('id');
      this.id = idParam ? +idParam : null; // Convert to number if present
  
      const jobPostingIdParam = params.get('jobPostingId'); // Correctly declare jobPostingIdParam
      if (jobPostingIdParam) {
        this.jobPostingId = +jobPostingIdParam; // Safely convert to number if it's not null
        this.fetchResumeDetails(this.jobPostingId);
      } else {
        console.error('No jobPostingId found in the query parameters.');
      }
    });
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
  
  logout(): void {
    // Clear local storage and navigate to the front page
    localStorage.removeItem('jobseeker');
    this.router.navigate(['jobseeker/jfrontpage']);
  }
}

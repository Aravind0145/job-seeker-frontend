import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jobpostings } from '../../../jobpostings';
import { EmployeeserviceService } from '../../../employeeservice.service';

@Component({
  selector: 'app-view-job-postings',
  templateUrl: './view-job-postings.component.html',
  styleUrls: ['./view-job-postings.component.css']
})
export class ViewJobPostingsComponent implements OnInit {
  jobPostings: Jobpostings[] = []; // Array to hold job postings
  fullName: string = '';
  id: number | null = null; // ID to fetch specific job postings
  applicantCounts: { [key: number]: number } = {}; // Store applicant counts by jobPostingId

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empService: EmployeeserviceService // Inject the EmployeeService
  ) {}

  ngOnInit(): void {
    // Get 'id' and 'fullName' from query parameters
    this.route.queryParams.subscribe((params) => {
      this.fullName = params['fullName'] || 'Guest'; // Default to 'Guest' if not present
      this.id = params['id'] ? +params['id'] : null; // Convert to number if present

      if (this.id !== null) {
        this.getJobPostingsById(this.id); // Fetch job postings for the given ID
      }
    });
  }
  isHighApplicantCount(postingId: number): boolean {
    return (this.applicantCounts[postingId] || 0) > 5;
  }
  

  // Fetch job postings by ID
  getJobPostingsById(id: number): void {
    console.log('Fetching job postings for ID:', id);

    this.empService.getJobPostingsById(id).subscribe(
      (data: Jobpostings[]) => {
        console.log('Received job postings:', data); // Log the response
        this.jobPostings = data; // Assign the data to the jobPostings array

        // After fetching job postings, fetch applicant count for each posting
        this.jobPostings.forEach(posting => {
          if (posting.id !== undefined) { // Ensure that posting.id is not undefined
            this.getApplicantCount(posting.id); // Get the applicant count for each job posting (use `id` here)
          }
        });
      },
      (error) => {
        console.error('Error fetching job postings:', error);
      }
    );
  }

  // Fetch applicant count for a given job posting
  getApplicantCount(jobPostingId: number): void {
    this.empService.getApplicantCount(jobPostingId)
      .subscribe(count => {
        this.applicantCounts[jobPostingId] = count; // Store count by jobPostingId
      });
  }
  deleteJobPosting(jobPostingId: number | undefined): void {
    if (jobPostingId === undefined) {
      alert('Invalid job posting ID.');
      return;
    }
  
    const confirmation = confirm('Are you sure you want to delete this job posting?');
    if (confirmation) {
      this.empService.deleteJobPosting(jobPostingId).subscribe({
        next: () => {
          alert('Job posting deleted successfully.');
          this.jobPostings = this.jobPostings.filter(posting => posting.id !== jobPostingId);
        },
        error: (err) => {
          console.error('Error deleting job posting:', err);
          alert('Failed to delete job posting. Please try again.');
        }
      });
    }
  }
  

  logout(): void {
    // Clear local storage and navigate to the front page
    localStorage.removeItem('jobseeker');
    this.router.navigate(['jobseeker/jfrontpage']);
  }
}

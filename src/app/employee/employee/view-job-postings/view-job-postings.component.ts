import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jobpostings } from '../../../jobpostings';
import { EmployeeserviceService } from '../../../jobseeker/employeeservice.service';
import { ToasterService } from '../../../toaster.service';

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
  isHomeActive: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empService: EmployeeserviceService,
    private toaster:ToasterService
  ) {}

  ngOnInit(): void {
    // Get 'id' and 'fullName' from state
    const state = history.state;
  
    this.fullName = state?.fullName || 'Guest'; // Default to 'Guest' if not present
    this.id = state?.id || null; // Set to null if 'id' is not present
  
    if (this.id !== null) {
      this.getJobPostingsById(this.id); // Fetch job postings for the given ID
    }
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
          this.toaster.showSuccess("Deleted Sucessfully","Success");
          this.jobPostings = this.jobPostings.filter(posting => posting.id !== jobPostingId);
        },
        error: (err) => {
          console.error('Error deleting job posting:', err);
          alert('Failed to delete job posting. Please try again.');
        }
      });
    }
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
  

  navigateToResumeDetails(jobPostingId: number): void {
    this.router.navigateByUrl('/resumedetails', {
      state: { fullName: this.fullName,id:this.id, jobPostingId: jobPostingId },
    });
  }
  
  
  navigateToUpdateApplication(jobPostingId: number): void {
    this.router.navigateByUrl('/updateapplication', {
      state: { fullName: this.fullName,id:this.id, jobPostingId: jobPostingId },
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

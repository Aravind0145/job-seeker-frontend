import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobseekerserviceService } from '../../jobseekerservice.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {
  fullName: string = '';
  jobSeekerId: number | null = null;
  resumeId: number | null = null; // Store resumeId
  applications: any[] = []; // Array to store applications

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobseekerService: JobseekerserviceService
  ) {}

  ngOnInit(): void {
    // Retrieve query parameters
    this.route.queryParams.subscribe((params) => {
      this.fullName = params['fullName'] || 'Guest';  
      this.jobSeekerId = params['id']; // Get jobSeekerId from query params
      this.resumeId = params['resumeId']; // Get resumeId from query params if available

      if (this.jobSeekerId) {
        this.loadApplications(this.jobSeekerId); // Load applications if id is available
        this.getResumeDetails(this.jobSeekerId); // Fetch the resume details as well
      }
    });
  }

  // Fetch the job applications for the job seeker
  loadApplications(jobSeekerId: number): void {
    this.jobseekerService.getApplicationsByJobSeeker(jobSeekerId).subscribe(
      (applications) => {
        this.applications = applications; // Store the applications in the component
      },
      (error) => {
        console.error('Error fetching job applications:', error);
      }
    );
  }

  // Fetch the resume by job seeker ID
// Fetch the resume by job seeker ID
getResumeDetails(id: number): void {
  this.jobseekerService.getResumeById(id).subscribe(
    (data) => {
      if (data && data.id !== undefined) {
        this.resumeId = data.id; // Assign a valid number to resumeId
        console.log('Resume details fetched successfully:', data);
      } else {
        this.resumeId = null; // Ensure resumeId is null if no valid id is found
      }
    },
    (error) => {
      console.error('Error fetching resume details:', error);
    }
  );
}


  // Method to withdraw application
  withdrawApplication(applicationId: number): void {
    if (this.jobSeekerId) {
      this.jobseekerService.withdrawApplication(this.jobSeekerId, applicationId).subscribe(
        () => {
          // Remove the application from the list after successful deletion
          this.applications = this.applications.filter(application => application.applicationId !== applicationId);
          alert('Application withdrawn successfully!');

          // Navigate to jobseeker homepage and pass jobSeekerId and jobSeekerFullName as query parameters
          this.router.navigate(['/jobseeker/jobseekerhomepage'], {
            queryParams: { fullName: this.fullName, id: this.jobSeekerId }
          });
        },
        (error) => {
          console.error('Error withdrawing application:', error);
        }
      );
    }
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('jobseeker'); // Remove jobseeker data from local storage
    this.router.navigate(['/jobseeker/jfrontpage']); // Navigate to jobseeker front page after saving resume
  }
}

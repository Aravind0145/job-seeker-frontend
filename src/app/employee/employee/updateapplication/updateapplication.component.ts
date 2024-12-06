import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '../../../application';
import { EmployeeserviceService } from '../../../employeeservice.service';

@Component({
  selector: 'app-updateapplication',
  templateUrl: './updateapplication.component.html',
  styleUrls: ['./updateapplication.component.css']
})
export class UpdateapplicationComponent implements OnInit {
  fullName: string = '';
  applications: Application[] = []; // List of applications
  application: Application = {
    jobPosting_id: 0,
    jobSeeker_id: 0,
    resume_id: 0,
    status: 'Pending' // Default value for status
  };
  applicationId: number | null = null; // ID for selected application
  jobPostingId: number = 0; // Job Posting ID
  jobSeekerId: number = 0; // Job Seeker ID

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: EmployeeserviceService
  ) {}

  ngOnInit(): void {
    // Fetch query params to get the Job Posting ID
    this.route.queryParams.subscribe(params => {
      this.fullName = params['fullName'] || 'Guest'; // If 'fullName' is not present, set it as 'Guest'
      const jobPostingId = params['jobPostingId'] ? +params['jobPostingId'] : null;
      console.log("JobPostingId: " + jobPostingId);
      if (jobPostingId !== null) {
        this.jobPostingId = jobPostingId;
        this.getApplications(jobPostingId); // Fetch applications for this job posting
      }
    });
  }

  // Fetch applications for a specific JobPostingId
  getApplications(jobPostingId: number): void {
    this.appService.getApplicationsByJobPostingId(jobPostingId).subscribe(
      (applications: Application[]) => {
        this.applications = applications;
        console.log(`Fetched ${applications.length} applications.`);
        this.applications.forEach(application => {
          console.log(`JobSeeker ID: ${application.jobSeeker_id}`);
        });
      },
      error => {
        console.error('Error fetching applications:', error);
        alert('Failed to fetch applications. Please try again later.');
      }
    );
  }

  // Submit a job application
  submitJobApplication(jobPostingId: number, jobSeekerId: number, applicationId?: number): void {
    console.log('submitJobApplication called with:');
    console.log('jobPostingId:', jobPostingId);
    console.log('jobSeekerId:', jobSeekerId);
    console.log('applicationId:', applicationId);

    if (jobPostingId && jobSeekerId) {
      const applicationIdParam = applicationId ?? undefined;

      this.appService.postJobPostingAndJobSeeker(jobPostingId, jobSeekerId, applicationIdParam).subscribe(
        (applications: Application[]) => {
          console.log('Applications created:', applications);
          alert('Job application posted successfully!');
          this.performAdditionalLogic(); // Call additional logic here after a successful submission
        },
        error => {
          console.error('Error posting job application:', error);
        }
      );
    } else {
      alert('Please ensure both Job Posting ID and Job Seeker ID are provided.');
    }
  }

  // Combined method to handle application updates and subsequent job application
  onSubmit(app: Application): void {
    console.log('onSubmit called with application:', app);

    if (app.applicationId !== null && app.applicationId !== undefined) {
      this.appService.updateApplication(app.applicationId, app).subscribe(
        (updatedApplication: Application) => {
          console.log('Updated Application:', updatedApplication); // Log the updated application response

          alert(`Application ID ${app.applicationId} updated successfully!`);

          // Check if the jobPosting and jobSeeker fields exist and log them
          const jobPostingId = updatedApplication.jobPosting?.id;  // Access jobPosting.id using optional chaining
          const jobSeekerId = updatedApplication.jobSeeker?.id;    // Access jobSeeker.id using optional chaining

          console.log('Job Posting ID:', jobPostingId);
          console.log('Job Seeker ID:', jobSeekerId);

          if (jobPostingId && jobSeekerId) {
            this.submitJobApplication(jobPostingId, jobSeekerId, app.applicationId); // Pass IDs to submitJobApplication
          } else {
            alert('Job Posting ID and Job Seeker ID must be provided.');
          }
        },
        error => {
          console.error('Error updating application:', error);
          alert('Failed to update application. Please try again later.');
        }
      );
    } else {
      alert('Invalid application ID. Cannot update.');
    }
  }

  // Additional method for custom operations after application submission
  performAdditionalLogic(): void {
    console.log('Performing additional operations...');
    // Add any additional business logic here
  }

  // Select an application for updating
  selectApplication(application: Application): void {
    this.applicationId = application.applicationId ?? null;
    this.application = { ...application }; // Populate form with selected application data
    console.log(`Selected Application ID: ${this.applicationId}`);
    console.log(`Selected Job Posting ID: ${application.jobPosting?.id}`);  // Log jobPosting.id if it's nested
    console.log(`Selected Job Seeker ID: ${application.jobSeeker?.id}`);    // Log jobSeeker.id if it's nested
  }
  
  logout(): void {
    // Clear local storage and navigate to the front page
    localStorage.removeItem('jobseeker');
    this.router.navigate(['jobseeker/jfrontpage']);
  }
}

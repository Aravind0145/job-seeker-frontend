import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '../../../application';
import { EmployeeserviceService } from '../../../jobseeker/employeeservice.service';
import { ToasterService } from '../../../toaster.service';

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
  id:number|null=null;
  isHomeActive: boolean = false;
  message: string = '';
  messageClass: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: EmployeeserviceService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    // Use history.state to retrieve the fullName, id, and jobPostingId
    const state = history.state;
  
    this.fullName = state.fullName || 'Guest'; // Default to 'Guest' if not present
    this.id = state.id || null; // Set to null if id is not present
    this.jobPostingId = state.jobPostingId || null; // Set to null if jobPostingId is not present
  
    console.log('Full Name:', this.fullName);
    console.log('Employee ID:', this.id);
    console.log('Job Posting ID:', this.jobPostingId);
  
    // Fetch applications if jobPostingId is available
    if (this.jobPostingId !== null) {
      this.getApplications(this.jobPostingId);
    } else {
      console.error('No jobPostingId found in the state.');
    }
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
          this.toaster.showSuccess("Updated Application Status","Success");
          this.message = '';
          this.messageClass = 'success-message';  // You can customize this class for styling
          setTimeout(() => {
            this.message = '';  // Clear the message
            this.messageClass = '';  // Reset the class
          }, 5000);
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

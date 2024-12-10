import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { Resume } from '../../resume';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {
  resume: Resume | null = null;
  fullName: string = '';
  id: number | null = null;
  resumeId: number | null = null; // Store resumeId
  applications: any[] = []; // Array to store applications
  applicationMessage: string = ''; // Default message is empty
  applicationMessageClass: string = ''; // Default class is empty


  constructor(
    private router: Router,
    private jobseekerService: JobseekerserviceService
  ) {}

  ngOnInit(): void {
    // Retrieve state data passed with navigateByUrl()
    const state = history.state;
  
    if (state) {
      this.fullName = state.fullName || 'Guest';
      this.id = state.id || null; // Ensure id is set or fallback to null
      this.resumeId = state.resumeId || null; // Ensure resumeId is set or fallback to null
  
      console.log('jobseekerId:', this.id);
  
      if (this.id) {
        this.loadApplications(this.id); // Load applications if id is available
      }
  
      if (this.resumeId !== null) {
        this.getResumeDetails(this.resumeId); // Fetch the resume details only if resumeId is not null
      }
    } else {
      console.warn('No state data found.');
    }
  }
  
  

  // Fetch the job applications for the job seeker
  loadApplications(id: number): void {
    this.jobseekerService.getApplicationsByJobSeeker(id).subscribe(
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

  // Method to withdraw application
  withdrawApplication(applicationId: number): void {
    if (this.id) {
      this.jobseekerService.withdrawApplication(this.id, applicationId).subscribe(
        () => {
          // Remove the application from the list after successful deletion
          this.applications = this.applications.filter(application => application.applicationId !== applicationId);
          
          // Set the message for success
          this.applicationMessage = 'Application withdrawn successfully!';
          this.applicationMessageClass = 'success-message'; // You can customize this class for success
  
          // Clear the message after 3 seconds (Optional)
          setTimeout(() => {
            this.applicationMessage = '';
            this.applicationMessageClass = '';
          }, 5000);
  
          // Navigate to jobseeker homepage and pass jobSeekerId and jobSeekerFullName as query parameters
        },
        (error) => {
          console.error('Error withdrawing application:', error);
  
          // Set the message for error
          this.applicationMessage = 'Error withdrawing application. Please try again.';
          this.applicationMessageClass = 'error-message'; // Customize the class for error
  
          // Clear the message after 3 seconds (Optional)
          setTimeout(() => {
            this.applicationMessage = '';
            this.applicationMessageClass = '';
          }, 3000);
        }
      );
    }
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
  
  

  // Logout method
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('fullName');
    localStorage.removeItem('id');
    this.router.navigate(['/jfrontpage']); // Navigate to jobseeker front page after saving resume
  }
}

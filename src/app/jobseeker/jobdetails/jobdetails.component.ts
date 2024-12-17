import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobseekerserviceService } from '../../Servicess/jobseekerservice.service';
import { Application } from '../../Interfaces/application';
import { ToasterService } from '../../Servicess/toaster.service';

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.css'],
})
export class JobdetailsComponent implements OnInit {
  fullName: string = '';
  id: number | null = null; // job_seeker_id
  resumeId: number | null = null; // Add resumeId property
  job: any;
  message: string = ''; // Variable to store the message
  messageClass: string = ''; // Class to style the message
  hasApplied: boolean = false;
  applicationMessage: string = ''; // Default message is empty
  applicationMessageClass: string = ''; // Default class is empty
  resumeExists: boolean = false; // Track if resume already exists


  constructor(
    private route: ActivatedRoute,
    private router :Router,
    private applicationService: JobseekerserviceService,
    private toaster:ToasterService
  ) {}

  ngOnInit(): void {
    // Retrieve data from the state object
    const state = history.state;
  
    this.fullName = state['fullName'] || 'Guest';
    this.id = state['id'] || null;
    this.resumeId = state['resumeId'] || null;
    this.job = state['jobData'] || null;
  
    if (this.id) {
      // Check if the resume exists for the provided job seeker ID
      this.applicationService.checkResumeExistence(this.id).subscribe({
        next: (exists: boolean) => {
          this.resumeExists = exists;
          console.log('Resume Exists:', this.resumeExists);
  
          if (this.resumeExists) {
          } else {
            console.log('No resume found, ready to create a new one');
          }
        },
        error: (error) => {
          console.error('Error checking resume existence:', error);
        },
      });
      }
  
    this.checkIfAlreadyApplied(); // Check if the user has already applied for the job
  }
  

  checkIfAlreadyApplied() {
    console.log('Job ID:', this.job.id);  // Debug log
    console.log('User ID:', this.id);     // Debug log
  
    if (this.job.id && this.id) {
      this.applicationService.checkApplicationStatus(this.job.id, this.id).subscribe(
        (response) => {
          console.log('API response:', response);  // Log the response here
  
          if (response) {  // response is a boolean (true or false)
            this.message = 'Already Applied.';
            this.messageClass = 'success-message';
          } else {
            
            this.messageClass = 'error-message';
          }
  
          console.log('Message:', this.message);  // Log the message
          console.log('Message Class:', this.messageClass);
        },
        (error) => {
          console.error('Error checking application status:', error);
        }
      );
    } else {
      console.error('Invalid Job ID or User ID');
    }
  }
  
  

  applyForJob(): void {
    if (!this.id || !this.job || !this.job.id || !this.resumeId) {
      alert('Invalid job, user, or resume details');
      return;
    }
  
    const applicationData: Application = {
      jobPosting_id: this.job.id,
      jobSeeker_id: this.id,
      resume_id: this.resumeId, // Include resumeId in the application
    };
  
    // Pass applicationData to the service
    this.applicationService
    .submitApplication(applicationData, this.job.id, this.id, this.resumeId)
    .subscribe(
      (response) => {
        console.log('Application submitted successfully:', response);
        this.applicationMessage = 'Applied successfully!';
        this.applicationMessageClass = 'success-message';
        setTimeout(() => {
          this.applicationMessage = '';  // Clear the message
          this.applicationMessageClass = '';  // Reset the class
        }, 5000);
        
        // Optionally navigate to another page
      },
      (error) => {
        console.error('Error submitting application:', error);
        this.applicationMessage = 'Error submitting application. Please try again.';
        this.applicationMessageClass = 'error-message';
      }
    );
  }
  getResumeDetails(id: number): void {
    this.applicationService.getResumeById(id).subscribe(
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
      state: { fullName: this.fullName, id: this.id, resumeId: this.resumeId }
    });
  }

  navigateToViewResumePage(): void {
    this.router.navigateByUrl('/viewresume', {
      state: { fullName: this.fullName, id: this.id, resumeId: this.resumeId }
    });
  }
  
  
  navigateToJobsAppliedPage(): void {
    this.router.navigateByUrl('/applyjobs', {
      state: { fullName: this.fullName, id: this.id,resumeId: this.resumeId }
    });
  }
  navigateToViewProfile(): void {
    this.router.navigateByUrl('/viewprofile', {
      state: { fullName: this.fullName, id: this.id }
    });
  }
  
  navigateToUpdateProfile(): void {
    this.router.navigateByUrl('/updateprofile', {
      state: { fullName: this.fullName, id: this.id }
    });
  }
  

  
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    localStorage.removeItem('id');
    this.router.navigate(['/jfrontpage']); // Navigate to jobseeker front page after saving resume
  }
}

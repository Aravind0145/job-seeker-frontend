import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { Resume } from '../../resume';

@Component({
  selector: 'app-updateresume',
  templateUrl: './updateresume.component.html',
  styleUrls: ['./updateresume.component.css']
})
export class UpdateresumeComponent implements OnInit {
  resume: Resume | null = null;
  fullName: string = 'Guest'; // Default to 'Guest'
  id: number | null = null; // For storing query parameter id
  resumeId: number | null = null; // Define resumeId
  originalResume: Resume | null = null;
  message: string = '';          // Default empty string, no message initially
  messageClass: string = '';


  constructor(
    private route: ActivatedRoute,
    private jobseekerService: JobseekerserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve state data passed with navigateByUrl()
    const state = history.state;
    
    if (state) {
      this.fullName = state.fullName || 'Guest';
      this.id = state.id || null;
      this.resumeId = state.resumeId || null;
      
      console.log('Full Name:', this.fullName);
      console.log('ID:', this.id);
      console.log('Resume ID:', this.resumeId);
  
      if (this.resumeId) {
        this.getResumeDetails(this.resumeId); // Fetch resume details
      } else {
        console.error('No resumeId found.');
      }
    } else {
      console.warn('No state data found.');
    }
  }
  

  getResumeDetails(id: number): void {
    this.jobseekerService.getResumeById(id).subscribe(
      (data: Resume) => {
        this.resume = data;
        this.originalResume = { ...data };
        console.log('Resume details fetched successfully:', data);
      },
      (error) => {
        console.error('Error fetching resume details:', error);
      }
    );
  }
  isFormModified(): boolean {
    return JSON.stringify(this.resume) !== JSON.stringify(this.originalResume);
  }
  
  updateResume(): void {
    if (this.resume && this.resume.id !== undefined) {  // Check if resume is not null
      const updatedResume = { ...this.resume, id: this.resume.id };
  
      this.jobseekerService.updateResume(updatedResume, this.resume.id).subscribe(
        (data) => {
          console.log('Resume updated successfully:', data);
  
          // Set success message
          this.message = 'Resume updated successfully!';
          this.messageClass = 'success-message';  // You can customize this class for styling
          setTimeout(() => {
            this.message = '';  // Clear the message
            this.messageClass = '';  // Reset the class
          }, 5000);
          
          if (this.resume?.id) {  // Optional chaining to safely access id
          
          }
        },
        (error) => {
          console.error('Error updating resume:', error);
          
          // Set error message
          this.message = 'Error updating resume. Please try again.';
          this.messageClass = 'error-message';  // Customize error message class
        }
      );
    } else {
      console.error('Resume or Resume ID is undefined');
      
      // Set error message
      this.message = 'Resume not found!';
      this.messageClass = 'error-message';
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
  
  
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    localStorage.removeItem('id');
    this.router.navigateByUrl('/jfrontpage');
  }
}

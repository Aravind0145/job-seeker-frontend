import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';  // Import PlatformLocation
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { Jobseeker } from '../../jobseeker';
import { Resume } from '../../resume'; // Ensure the correct import path for Resume model
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from '../../toaster.service';


@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit, OnDestroy {
  jobseeker: Jobseeker = {
    fullName: '',
    email: '',
    password: '',
    phone: '',
    profilePhoto: '',
    workStatus: '',
    promotions: false
  };
  id: number | null = null;
  routeFullName: string = '';
  resumeId: number | null = null;
  resume: Resume | null = null;
  originalResume: Jobseeker | null = null;
  message: string = '';
  messageType: string = '';
  uploadingImage: boolean = false;  // To track the uploading state
  uploadError: string = ''; 
  resumeExists: boolean = false; // Track if resume already exists


  constructor(
    private router: Router,
    private jobseekerService: JobseekerserviceService,
    private platformLocation: PlatformLocation, // Use PlatformLocation
    private http: HttpClient,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    // Prevent back/forward navigation by listening to popstate events
    window.onpopstate = () => {
      history.go(1); // Pushes the user forward to prevent back navigation
    };
  
    // Retrieve state data passed with navigateByUrl()
    const state = history.state;
  
    if (state) {
      this.routeFullName = state['fullName'] || 'Guest'; // Get fullName from state
      this.id = state['id'] || null; // Get id from state
      this.resumeId = state['resumeId'] || null; // Get resumeId from state
  
      console.log('State Data:', state); // Debugging state data
  
      if (this.id !== null) {
        this.getJobseeker(this.id); // Call getJobseeker if id exists
      }
  
      if (this.resumeId !== null) {
        this.getResumeDetails(this.resumeId); // Call getResumeDetails if resumeId exists
      }
  
      // Check if the resume exists for the provided job seeker ID
      if (this.id) {
        this.jobseekerService.checkResumeExistence(this.id).subscribe({
          next: (exists: boolean) => {
            this.resumeExists = exists;
            console.log('Resume Exists:', this.resumeExists);
  
            if (this.resumeExists) {
              // Fetch resume details if a resume exists
            } else {
              console.log('No resume found, ready to create a new one');
            }
          },
          error: (error) => {
            console.error('Error checking resume existence:', error);
          },
        });
      }
    } else {
      console.warn('No state data found.');
    }
  }
  

  ngOnDestroy(): void {
    // Clean up the onpopstate event listener when the component is destroyed
    window.onpopstate = null;
  }

  getJobseeker(id: number): void {
    this.jobseekerService.getJobSeekerProfile(id).subscribe(
      (jobseeker: Jobseeker) => {
        this.jobseeker = jobseeker;
        this.originalResume = { ...jobseeker };
        console.log('Jobseeker Data:', this.jobseeker);
      },
      error => {
        console.error('Error fetching jobseeker profile:', error);
      }
    );
  }

  isFormModified(): boolean {
    return JSON.stringify(this.jobseeker) !== JSON.stringify(this.originalResume);
  }

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

  
  uploadImage(event: any): void {
    this.uploadingImage = true;
    this.uploadError = '';
  
    const file = event.target.files[0];
    if (!file) {
      this.uploadingImage = false;
      return;
    }
  
    // Replace this with your cloud storage upload URL and API key
    const uploadUrl = 'https://api.imgbb.com/1/upload';
    const apiKey = 'f994aa94e60bf8071dae6a9723f989ef'; // ImgBB API Key
  
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', apiKey);
  
    // Make the request using fetch to ImgBB API
    fetch(uploadUrl, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.url) {
          this.jobseeker.profilePhoto = data.data.url; // Get the uploaded image URL
          alert('Image uploaded successfully.');
        } else {
          this.uploadError = 'Failed to upload image. Please try again.';
          alert(this.uploadError);
        }
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        this.uploadError = 'Failed to upload image. Please try again.';
        alert(this.uploadError);
      })
      .finally(() => {
        this.uploadingImage = false;
      });
  }
  
  
  
  onSubmit(): void {
    if (this.id !== null) {
      this.jobseekerService.updateJobSeeker(this.id, this.jobseeker).subscribe(
        (updatedJobseeker: Jobseeker) => {
          this.toaster.showSuccess('updated Successful!', 'Success'); // Success toast

          this.message = '';
          this.messageType = 'success-message'; // Set message type to success
          setTimeout(() => {
            this.message = '';  // Clear the message
            this.messageType = '';  // Reset the class
          }, 5000);
        },
        (error) => {
          this.message = 'Failed to update profile. Please try again later.';
          this.messageType = 'error'; // Set message type to error
          console.error('Error updating profile:', error);
        }
      );
    }
  }

  navigateToHomePage(): void {
    this.router.navigateByUrl('/jobseekerhomepage', {
      state: { fullName: this.routeFullName, id: this.id }
    });
  }

  navigateToResumePage(): void {
    this.router.navigateByUrl('/jobseekerresume', {
      state: { fullName: this.routeFullName, id: this.id }
    });
  }

  navigateToUpdateResumePage(): void {
    this.router.navigateByUrl('/updateresume', {
      state: { fullName: this.routeFullName, id: this.id, resumeId: this.resumeId }
    });
  }

  navigateToViewResumePage(): void {
    this.router.navigateByUrl('/viewresume', {
      state: { fullName: this.routeFullName, id: this.id, resumeId: this.resumeId }
    });
  }

  navigateToJobsAppliedPage(): void {
    this.router.navigateByUrl('/applyjobs', {
      state: { fullName: this.routeFullName, id: this.id, resumeId: this.resumeId }
    });
  }

  navigateToViewProfile(): void {
    this.router.navigateByUrl('/viewprofile', {
      state: { fullName: this.routeFullName, id: this.id, resumeId: this.resumeId }
    });
  }

  navigateToUpdateProfile(): void {
    this.router.navigateByUrl('/updateprofile', {
      state: { fullName: this.routeFullName, id: this.id, resumeId: this.resumeId }
    });
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('fullName');
    localStorage.removeItem('id');
    window.location.href = '/jfrontpage';
  }
}

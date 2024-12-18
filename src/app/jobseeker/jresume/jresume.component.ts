import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resume } from '../../Interfaces/resume'; // Ensure the interface is updated to include new fields
import { JobseekerserviceService } from '../../Servicess/jobseekerservice.service';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from '../../Servicess/toaster.service';

@Component({
  selector: 'app-jresume',
  templateUrl: './jresume.component.html',
  styleUrls: ['./jresume.component.css']
})
export class JresumeComponent implements OnInit {
  fullName: string = '';
  resume: Resume | null = null;

  jobseekerId: number | null = null; // Declare id to store the query param
  resumeExists: boolean = false; // Track if resume already exists

  // Define form fields as class properties
  resumeId: number | null = null;
  headline: string = '';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  dob: string = '';
  
  // Additional fields
  languages: string = '';
  linkedinurl: string = '';
  permanentAddress: string = '';
  currentAddress: string = '';
  profilePhoto: string = '';
  xth: string = '';
  xthYear: string = '';
  xii: string = '';
  xiiYear: string = '';
  graduation: string = '';
  graduationYear: string = '';
  pg: string = '';
  pgStatus: string = 'NA';
  skills: string = '';
  projectTitle: string = '';
  projectDescription: string = '';
  certificateName: string = '';
  certificateDescription: string = '';
  originalResume: Resume | null = null;
  message: string = '';
  messageClass: string = '';
  uploadingImage: boolean = false;  // To track the uploading state
  uploadError: string = ''; 


  constructor(
    private resumeService: JobseekerserviceService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private http: HttpClient,
    private toaster:ToasterService
  ) { }

  // Handle photo upload via Cloudinary
  uploadImage(event: Event): void {
    this.uploadingImage = true;
    this.uploadError = '';
  
    const input = event.target as HTMLInputElement;
  
    // Check if input is null or if it doesn't have files
    if (!input || !input.files || input.files.length === 0) {
      this.uploadingImage = false;
      return;
    }
  
    const file = input.files[0];
    
    // If no file is selected, stop the process
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
          this.profilePhoto = data.data.url; // Get the uploaded image URL
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
  
  
  ngOnInit(): void {
    // Retrieve state data passed with navigateByUrl()
    const state = history.state;
    
    if (state) {
      this.fullName = state.fullName || 'Guest';
      this.jobseekerId = state.id || null;
  
      console.log('Full Name:', this.fullName);
      console.log('Jobseeker ID:', this.jobseekerId);
  
      if (this.jobseekerId) {
        // Check if resume already exists for this jobseeker
        this.resumeService.checkResumeExistence(this.jobseekerId).subscribe({
          next: (exists: boolean) => {
            this.resumeExists = exists;
            console.log('Resume Exists:', this.resumeExists);

            if (this.resumeExists) {
              this.router.navigateByUrl('/jobseekerhomepage', {
                state: { fullName: this.fullName, id: this.jobseekerId }
              });
            } else {
              console.log('No resume found, ready to create a new one');
            }
          },
          error: (error) => {
            console.error('Error checking resume existence:', error);
          }
        });
  
        // Fetch resume details if a resume exists
        if (!this.resumeExists) {
          this.resumeService.getResumeById(this.jobseekerId).subscribe({
            next: (data: Resume) => {
              this.resume = data;
              this.resumeId = data.id || null;
              console.log('Resume details fetched successfully:', data);
              this.originalResume = { ...data };
            },
            error: (error) => {
              console.error('Error fetching resume details:', error);
            }
          });
        }
      } else {
        console.warn('Jobseeker ID is missing.');
      }
    } else {
      console.warn('No state data found.');
    }
  }

  preventClick(event: Event): void {
    if (this.resumeExists) {
      event.preventDefault();
    }
  }
  
  
  // Submit the form to create a resume
  resumecreation(): void {
    // Ensure that a job seeker ID is available before proceeding
    if (this.jobseekerId === null) {
      alert('Job Seeker ID is missing!');
      return;
    } else if (this.resumeExists) {
      alert('You have already created a resume.');
      return; // Prevent further action if resume already exists
    }

    // Create resume object based on form data, including the jobseekerId
    const resume: Resume = {
      jobseekerId: this.jobseekerId, // Pass the jobseekerId from the query param
      headline: this.headline,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      dob: this.dob,
      languages: this.languages,
      linkedinurl: this.linkedinurl,
      permanentAddress: this.permanentAddress,
      currentAddress: this.currentAddress,
      profilePhoto: this.profilePhoto, // Include the third-party photo URL
      xth: this.xth,
      xthYear: this.xthYear,
      xii: this.xii,
      xiiYear: this.xiiYear,
      graduation: this.graduation,
      graduationYear: this.graduationYear,
      pg: this.pg,
      pgStatus: this.pgStatus,
      skills: this.skills,
      projectTitle: this.projectTitle,
      projectDescription: this.projectDescription,
      certificateName: this.certificateName,
      certificateDescription: this.certificateDescription,
    };

    // Call the service to save the resume (implementation depends on the service)
    this.resumeService.saveResume(resume, this.jobseekerId).subscribe({
      next: (response) => {
        console.log('Resume saved', response);
        this.toaster.showSuccess("Resume Created successfully!", "Success");
        this.message = '';
        this.messageClass = 'success-message';  // You can customize this class for styling
    
        // Reset all the fields to default values
        this.headline = '';
        this.firstName = '';
        this.middleName = '';
        this.lastName = '';
        this.email = '';
        this.phoneNumber = '';
        this.dob = '';
        this.languages = '';
        this.linkedinurl = '';
        this.permanentAddress = '';
        this.currentAddress = '';
        this.profilePhoto = '';
        this.xth = '';
        this.xthYear = '';
        this.xii = '';
        this.xiiYear = '';
        this.graduation = '';
        this.graduationYear = '';
        this.pg = '';
        this.pgStatus = '';
        this.skills = '';
        this.projectTitle = '';
        this.projectDescription = '';
        this.certificateName = '';
        this.certificateDescription = '';
        
        // Clear the message after a delay
        setTimeout(() => {
          this.message = '';  // Clear the message
          this.messageClass = '';  // Reset the class
        }, 5000); // Delay for 5 seconds before clearing the message
      },
      error: (error) => {
        console.error('Failed to save resume:', error);
        this.toaster.showError("Failed to create resume!", "Error");
      }
    });
    
  }

  isFormUnchanged(): boolean {
    return JSON.stringify(this.resume) === JSON.stringify(this.originalResume);
  }

  navigateToHomePage(): void {
    this.router.navigateByUrl('/jobseekerhomepage', {
      state: { fullName: this.fullName, id: this.jobseekerId }
    });
  }
  
  
  navigateToResumePage(): void {
    // Make sure fullName and id are available
    console.log('Navigating with:', { fullName: this.fullName, id: this.jobseekerId });
  
    // Use navigateByUrl to pass state
    this.router.navigateByUrl('/jobseekerresume', {
      state: { fullName: this.fullName, id: this.jobseekerId }
    });
  }
  navigateToUpdateResumePage(): void {
    this.router.navigateByUrl('/updateresume', {
      state: { fullName: this.fullName, id: this.jobseekerId, resumeId: this.resume?.id }
    });
  }

  navigateToViewResumePage(): void {
    this.router.navigateByUrl('/viewresume', {
      state: { fullName: this.fullName, id: this.jobseekerId, resumeId: this.resume?.id }
    });
  }
  
  
  navigateToJobsAppliedPage(): void {
    this.router.navigateByUrl('/applyjobs', {
      state: { fullName: this.fullName, id: this.jobseekerId,resumeId: this.resume?.id }
    });
  }
  navigateToViewProfile(): void {
    this.router.navigateByUrl('/viewprofile', {
      state: { fullName: this.fullName, id: this.jobseekerId,resumeId: this.resume?.id }
    });
  }
  
  navigateToUpdateProfile(): void {
    this.router.navigateByUrl('/updateprofile', {
      state: { fullName: this.fullName, id: this.jobseekerId,resumeId: this.resume?.id }
    });
  }
  

  logout(): void {
    // Placeholder for logout functionality
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    localStorage.removeItem('id');
    this.router.navigate(['/jfrontpage']); // Navigate to jobseeker front page after saving resume
  }
}

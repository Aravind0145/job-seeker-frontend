import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resume } from '../../resume'; // Ensure the interface is updated to include new fields
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { HttpClient } from '@angular/common/http';

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
  companyName: string = '';
  startDate: string = '';
  endDate: string = '';
  jobTitle: string = '';
  jobDescription: string = ''; 

  constructor(
    private resumeService: JobseekerserviceService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private http: HttpClient
  ) { }

  // Handle photo upload via Cloudinary
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      // Cloudinary URL with your cloud name (dxful4bty)
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dxful4bty/image/upload`; // Cloud Name (dxful4bty) is used here
      formData.append('upload_preset', 'Aravind Image'); // The upload preset name
      
      // Now, make the POST request to Cloudinary's API with the above form data
      this.http.post(cloudinaryUrl, formData).subscribe({
        next: (response: any) => {
          if (response.secure_url) {
            this.profilePhoto = response.secure_url;  // Get the URL of the uploaded image
            console.log('Uploaded photo URL:', this.profilePhoto);
            alert('Photo uploaded successfully!');
          } else {
            console.error('Upload failed, no secure_url found');
            alert('Failed to upload photo. Please try again.');
          }
        },
        error: (error) => {
          console.error('Photo upload failed:', error);
          alert('Failed to upload photo. Please try again.');
        }
      });
    }
  }

  ngOnInit(): void {
    // Retrieve query parameters from the route
    this.route.queryParams.subscribe(params => {
      this.fullName = params['fullName'] || 'Guest';
      this.jobseekerId = params['id'] ? +params['id'] : null;
  
      // Ensure jobseekerId is available before making a service call
      if (this.jobseekerId) {
        // Check if resume already exists for this jobseeker
        this.resumeService.checkResumeExistence(this.jobseekerId).subscribe({
          next: (exists: boolean) => {
            this.resumeExists = exists;
            if (this.resumeExists) {
              alert('You have already created a resume.');
              this.router.navigate(['/jobseeker/jobseekerhomepage'], {
                queryParams: { fullName: this.fullName, id: this.jobseekerId }
              });
              // Optionally redirect or disable form inputs if needed
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
              this.resumeId = data.id || null; // Extract resumeId from the response
              console.log('Resume details fetched successfully:', data);
            },
            error: (error) => {
              console.error('Error fetching resume details:', error);
            }
          });
        }
      } else {
        console.warn('Jobseeker ID is missing in query parameters.');
      }
    });
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
      companyName: this.companyName,
      startDate: this.startDate,
      endDate: this.endDate,
      jobTitle: this.jobTitle,
      jobDescription: this.jobDescription 
    };

    // Call the service to save the resume (implementation depends on the service)
    this.resumeService.saveResume(resume, this.jobseekerId).subscribe({
      next: (response) => {
        console.log('Resume saved', response);
        alert('Successfully created resume!');
        this.router.navigate(['/jobseeker/jobseekerhomepage'], {
          queryParams: { fullName: this.fullName, id: this.jobseekerId }
        }); // Navigate to jobseeker front page after saving resume
      },
      error: (error) => {
        console.error('Failed to save resume:', error);
        alert('Failed to create resume. Please try again.');
      }
    });
  }

  logout(): void {
    // Placeholder for logout functionality
    localStorage.removeItem('jobseeker'); // Remove jobseeker data from local storage
    this.router.navigate(['/jobseeker/jfrontpage']); // Navigate to jobseeker front page after saving resume
  }
}

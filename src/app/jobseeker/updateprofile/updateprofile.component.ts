import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { Jobseeker } from '../../jobseeker';
import { Resume } from '../../resume';  // Ensure the correct import path for Resume model

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  jobseeker: Jobseeker = {
    fullName: '',
    email: '',
    password: '',
    phone: '',
    workStatus: '',
    promotions: false
  };
  id: number | null = null;
  routeFullName: string = ''; // Renamed to indicate it comes from the route
  resumeId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobseekerService: JobseekerserviceService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.routeFullName = params['fullName'] || 'Guest'; // Query param full name
      console.log('Query Params:', params);
      this.id = params['id'] ? +params['id'] : null;

      this.resumeId = params['resumeId'] ? +params['resumeId'] : null;

      if (this.id !== null) {
        this.getJobseeker(this.id);
      }

      if (this.resumeId !== null) {
        this.getResumeDetails(this.resumeId);
      }
    });
  }

  getJobseeker(id: number): void {
    this.jobseekerService.getJobSeekerProfile(id).subscribe(
      (jobseeker: Jobseeker) => {
        this.jobseeker = jobseeker;
        console.log('Jobseeker Data:', this.jobseeker);
      },
      error => {
        console.error('Error fetching jobseeker profile:', error);
      }
    );
  }

  getResumeDetails(id: number): void {
    this.jobseekerService.getResumeById(id).subscribe(
      (data: Resume) => {
        this.resumeId = data.id !== undefined ? data.id : null;
        console.log('Resume fetched successfully:', data);
      },
      (error) => {
        console.error('Error fetching resume:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.id !== null) {
      this.jobseekerService.updateJobSeeker(this.id, this.jobseeker).subscribe(
        (updatedJobseeker: Jobseeker) => {
          alert('Profile updated successfully!');
          this.router.navigate(['/jobseeker/jobseekerhomepage'], {
            queryParams: {
              id: updatedJobseeker.id,
              fullName: updatedJobseeker.fullName, // Using the updated jobseeker's full name
              resumeId: this.resumeId
            }
          });
        },
        (error) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again later.');
        }
      );
    }
  }

  logout(): void {
    localStorage.removeItem('jobseeker');
    this.router.navigate(['/jobseeker/jfrontpage']);
  }
}

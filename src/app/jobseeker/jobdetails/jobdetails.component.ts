import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { Application } from '../../application';

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

  constructor(
    private route: ActivatedRoute,
    private router :Router,
    private applicationService: JobseekerserviceService // Inject service
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.fullName = params['fullName'] || 'Guest';
      this.id = params['id'] ? +params['id'] : null;
      this.resumeId = params['resumeId'] ? +params['resumeId'] : null; // Extract resumeId

      if (params['jobData']) {
        const jobData = JSON.parse(params['jobData']);
        this.job = jobData;
      }
    });
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
          alert('Application submitted successfully!');
          this.router.navigate(['/jobseeker/jobseekerhomepage'], {
            queryParams: { fullName: this.fullName, id: this.id }
          }); 
        },
        (error) => {
          console.error('Error submitting application:', error);

          if (error.status === 400) {
            alert('You have already applied for this job!');
            this.router.navigate(['/jobseeker/jobseekerhomepage'], {
              queryParams: { fullName: this.fullName, id: this.id }
            });
          } else {
            alert('Failed to submit application. Please try again.');
            this.router.navigate(['/jobseeker/jobseekerhomepage'], {
              queryParams: { fullName: this.fullName, id: this.id }
            });
          }
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
  
  logout(): void {
    localStorage.removeItem('jobseeker'); // Remove jobseeker data from local storage
    this.router.navigate(['/jobseeker/jfrontpage']); // Navigate to jobseeker front page after saving resume
  }
}

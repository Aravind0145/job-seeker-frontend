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

  constructor(
    private route: ActivatedRoute,
    private jobseekerService: JobseekerserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get 'resumeId' and other parameters from queryParams
    this.route.queryParams.subscribe((params) => {
      this.fullName = params['fullName'] || 'Guest';
      this.id = params['id'] ? +params['id'] : null;
      this.resumeId = params['resumeId'] ? +params['resumeId'] : null; // Ensure resumeId is set

      if (this.resumeId) {
        this.getResumeDetails(this.resumeId); // Call method to fetch resume details
      } else {
        console.error('No resumeId found in query parameters.');
      }
    });
  }

  getResumeDetails(id: number): void {
    this.jobseekerService.getResumeById(id).subscribe(
      (data: Resume) => {
        this.resume = data;
        console.log('Resume details fetched successfully:', data);
      },
      (error) => {
        console.error('Error fetching resume details:', error);
      }
    );
  }

  updateResume(): void {
    if (this.resume && this.resume.id !== undefined) {  // Check if resume is not null
      const updatedResume = { ...this.resume, id: this.resume.id };
  
      this.jobseekerService.updateResume(updatedResume, this.resume.id).subscribe(
        (data) => {
          console.log('Resume updated successfully:', data);
          
          if (this.resume?.id) {  // Optional chaining to safely access id
            this.router.navigate(['/jobseeker/viewresume'], {
              queryParams: { resumeId: this.resume.id, fullName: this.fullName, id: this.id }
            });
          }
        },
        (error) => {
          console.error('Error updating resume:', error);
        }
      );
    } else {
      console.error('Resume or Resume ID is undefined');
    }
  }
  
  logout(): void {
    localStorage.removeItem('jobseeker');
    this.router.navigate(['/jobseeker/jfrontpage']);
  }
}

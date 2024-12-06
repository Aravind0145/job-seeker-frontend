import { Component, OnInit } from '@angular/core';
import { Resume } from '../../resume'; // Ensure the path to the Resume model is correct
import { ActivatedRoute, Router } from '@angular/router';
import { JobseekerserviceService } from '../../jobseekerservice.service';

@Component({
  selector: 'app-viewresume',
  templateUrl: './viewresume.component.html',
  styleUrls: ['./viewresume.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class ViewresumeComponent implements OnInit {
  fullName: string = '';
  resume: Resume | null = null; // Holds the resume details
  showSearch: boolean = false; // Toggle search form visibility
  id: number | null = null;
  resumeId: number | null = null; // Added resumeId to store the resume's ID

  constructor(
    private route: ActivatedRoute,
    private jobseekerService: JobseekerserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get 'resumeId' and other queryParams
    this.route.queryParams.subscribe((params) => {
      this.fullName = params['fullName'] || 'Guest';
      this.id = params['id'] ? +params['id'] : null;

      const resumeId = params['resumeId'];
      if (resumeId) {
        this.getResumeDetails(+resumeId); // Convert to number before passing
      }
    });
  }

  toggleSearch(): void {
    console.log('Toggling search visibility');
    this.showSearch = !this.showSearch; // Toggle the visibility of search form
  }

  getResumeDetails(id: number): void {
    // Fetch resume details by ID
    this.jobseekerService.getResumeById(id).subscribe(
      (data: Resume) => {
        this.resume = data; // Set the retrieved resume data
        this.resumeId = data.id !== undefined ? data.id : null; // Ensure resumeId is set
        console.log('Resume fetched successfully:', data);
      },
      (error) => {
        console.error('Error fetching resume:', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('jobseeker');
    this.router.navigate(['/jobseeker/jfrontpage']);
  }
}

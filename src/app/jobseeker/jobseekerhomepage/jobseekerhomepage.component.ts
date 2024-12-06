import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resume } from '../../resume';
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { Jobpostings } from '../../jobpostings';

@Component({
  selector: 'app-jobseekerhomepage',
  templateUrl: './jobseekerhomepage.component.html',
  styleUrls: ['./jobseekerhomepage.component.css']
})
export class JobseekerhomepageComponent implements OnInit {
  jobTableVisible = true; // Initially set to true to show the table
  jobpostings: Jobpostings[] = [];
  searchJobPostings: Jobpostings[] = []; // New array for search results
  fullName: string = '';
  id: number | null = null;
  resume: Resume | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;

  searchCriteria = {
    jobTitle: '',
    location: '',
    experience: 0,
  };

  showSearch: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobseekerService: JobseekerserviceService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.fullName = params['fullName'] || 'Guest';
      console.log(this.fullName);
      this.id = params['id'] ? +params['id'] : null;

      if (this.id !== null) {
        this.getResume(this.id);
      }

      this.getJobPostings();
    });
  }

  getResume(id: number): void {
    this.jobseekerService.getResume(id).subscribe(
      (data) => {
        if (data) {
          this.resume = data;
          this.fullName = `${data.firstName} ${data.middleName} ${data.lastName}`.trim();
        } else {
          console.error('No resume data found');
        }
      },
      (error) => {
        console.error('Error fetching resume:', error);
      }
    );
  }

  getJobPostings(): void {
    this.jobseekerService.getJobPostings(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        this.jobpostings = response.data;
        this.totalPages = Math.ceil(response.totalCount / this.itemsPerPage);
      },
      error: (err) => {
        console.error('Error fetching job postings:', err);
      }
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getJobPostings();
    }
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch; // Toggle the visibility of search form
  }

  viewJobDetails(job: Jobpostings): void {
    this.router.navigate(['/jobseeker/jobdetails'], {
      queryParams: {
        jobData: JSON.stringify(job),
        fullName: this.fullName,
        id: this.id,
        resumeId: this.resume?.id,
      },
    });
  }

  searchJobs(): void {
    this.jobseekerService.searchJobs(this.searchCriteria).subscribe(
      (data) => {
        this.searchJobPostings = data;  // Store the search results in searchJobPostings
      },
      (error) => {
        console.error('Error fetching job postings:', error);
      }
    );
  }

  hideJobTable(): void {
    this.jobTableVisible = false; // Hide the table
  }

  logout(): void {
    localStorage.removeItem('jobseeker');
    this.router.navigate(['/jobseeker/jfrontpage']);
  }
}

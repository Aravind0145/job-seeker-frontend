import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms'; // Import NgForm for typing
import { EmployeeserviceService } from '../../../employeeservice.service';
import { Jobpostings } from '../../../jobpostings';

@Component({
  selector: 'app-job-postings',
  templateUrl: './job-postings.component.html',
  styleUrls: ['./job-postings.component.css'],
})
export class JobPostingsComponent implements OnInit {
  fullName: string = '';
  id: number | null = null; // ID of the user posting the job

  // Form fields for job postings
  jobTitle: string = '';
  jobDescription: string = '';
  companyName: string = '';
  rolesAndResponsibilities: string = ''; // Added field for roles and responsibilities
  location: string = '';
  employmentType: string = '';
  salary: string = '';
  jobCategory: string = '';
  skills: string = '';
  experience: string = '';
  education: string = ''; // Added field for education
  numberOfOpenings: number | null = null; // Ensure proper initialization
  lastDate: Date = new Date(); // Add this line to bind the last date

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeserviceService // Inject the service
  ) {}

  onDateChange(event: any) {
    const inputDate = event.target.value; // Captures the input date
    console.log('Formatted Date:', inputDate); // Logs date in 'YYYY-MM-DD'
    this.lastDate = inputDate; // Directly assign it as the input is already in 'YYYY-MM-DD' format
  }

  ngOnInit(): void {
    // Get the name and id from query params
    this.route.queryParams.subscribe((params) => {
      this.fullName = params['fullName'] || 'Guest'; // If 'fullName' is not present, set it as 'Guest'
      this.id = params['id'] ? +params['id'] : null; // Convert 'id' to number if it exists, otherwise set it to null
      console.log('Welcome user:', this.fullName);
      console.log('Employee ID:', this.id); // Log the id
    });
  }

  postJobEmployee(): void {
    if (!this.id) {
      alert('User ID is not available. Cannot post the job.');
      return;
    }

    // Validate the number of openings
    if (this.numberOfOpenings === null || this.numberOfOpenings <= 0) {
      alert('Please enter a valid number of openings.');
      return;
    }

    // Create the job posting object
    const jobposting: Jobpostings = {
      employeeId: this.id,
      jobTitle: this.jobTitle,
      jobDescription: this.jobDescription,
      rolesAndResponsibilities: this.rolesAndResponsibilities,
      companyName: this.companyName,
      location: this.location,
      employmentType: this.employmentType,
      salary: this.salary,
      jobCategory: this.jobCategory,
      skills: this.skills,
      experience: this.experience,
      education: this.education,
      numberOfOpenings: this.numberOfOpenings,
      lastDate: this.lastDate,
    };

    // Call the service to post the job
    this.employeeService.postJobEmployee(jobposting, this.id).subscribe(
      (response) => {
        console.log('Job posted successfully:', response);
        alert('Job has been posted successfully!');
        this.router.navigate(['/employee/emphomepage'], {
          queryParams: { fullName: this.fullName, id: this.id },
        });
      },
      (error) => {
        console.error('Error posting job:', error);
        alert('Failed to post job. Please try again.');
      }
    );
  }
  
  logout(): void {
    // Clear local storage and navigate to the front page
    localStorage.removeItem('jobseeker');
    this.router.navigate(['jobseeker/jfrontpage']);
  }
}

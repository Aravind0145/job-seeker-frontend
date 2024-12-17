import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeserviceService } from '../../../Servicess/employeeservice.service';
import { Jobpostings } from '../../../Interfaces/jobpostings';
import { ToasterService } from '../../../Servicess/toaster.service';

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
  message: string = '';
  messageClass: string = '';

  isHomeActive: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeserviceService,
    private toaster: ToasterService
  ) {}

  onDateChange(event: any) {
    const inputDate = event.target.value; // Captures the input date
    console.log('Formatted Date:', inputDate); // Logs date in 'YYYY-MM-DD'
    this.lastDate = inputDate; // Directly assign it as the input is already in 'YYYY-MM-DD' format
  }

  ngOnInit(): void {
    // Retrieve state data passed with navigateByUrl()
    const state = history.state;
    
    // Check if state is available and assign values
    if (state) {
      this.fullName = state.fullName || 'Guest'; // If 'fullName' is not present, set it as 'Guest'
      this.id = state.id || null; // If 'id' is not present, set it to null
      console.log('Welcome user:', this.fullName);
      console.log('Employee ID:', this.id); // Log the id
    } else {
      console.warn('No state data found.');
    }
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
        this.toaster.showSuccess("Job posted successfully", "Success");
        this.message = '';
        this.messageClass = 'success-message';  // You can customize this class for styling
        this.id = null;
    this.jobTitle = '';
    this.jobDescription = '';
    this.rolesAndResponsibilities = '';
    this.companyName = '';
    this.location = '';
    this.employmentType = '';
    this.salary = '';
    this.jobCategory = '';
    this.skills = '';
    this.experience = '';
    this.education = '';
    this.numberOfOpenings = null;
        setTimeout(() => {
          this.message = '';  // Clear the message
          this.messageClass = '';  // Reset the class
        }, 5000); 
      },
      (error) => {
        console.error('Error posting job:', error);
        this.toaster.showError("Job posting failed", "Error");
      }
    );
  }
  
  navigateToHomePage(): void {
    this.isHomeActive = true;
    this.router.navigateByUrl('/emphomepage', {
      
      state: { fullName: this.fullName, id: this.id }
    });
  }

  navigateToPostJobsPage(): void {
    this.router.navigateByUrl('/postjobs', {
      state: { fullName: this.fullName, id: this.id }
    });
  }

  navigateToViewJobPostings(): void {
    this.router.navigateByUrl('/viewjobpostings', {
      state: { fullName: this.fullName, id: this.id }
    });
  }

  navigateToProfile(): void {
    this.router.navigateByUrl('/employeeprofile', {
      state: { fullName: this.fullName, id: this.id }
    });
  }
  
  navigateToUpdateProfile(): void {
    this.router.navigateByUrl('/employeeupdateprofile', {
      state: { fullName: this.fullName, id: this.id }
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

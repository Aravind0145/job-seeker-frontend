import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../Interfaces/employee';
import { EmployeeserviceService } from '../../../Servicess/employeeservice.service';

@Component({
  selector: 'app-employeeviewprofile',
  templateUrl: './employeeviewprofile.component.html',
  styleUrl: './employeeviewprofile.component.css'
})
export class EmployeeviewprofileComponent implements OnInit {
  employee: Employee | null = null;
  id: number | null = null;
  fullName:string='';
  isHomeActive: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private empService: EmployeeserviceService
  ) {}

  ngOnInit(): void {
    // Access data from history.state
    const state = history.state;
  
    this.fullName = state.fullName || 'Guest'; // If 'fullName' is not present, set it as 'Guest'
    this.id = state.id || null; // Set 'id' from state, or null if not present
  
    console.log('Full Name:', this.fullName);
    console.log('Employee ID:', this.id);
  
    // Fetch employee profile if the id is available
    if (this.id !== null) {
      this.getEmployeeProfile(this.id);
    }
  }
  
 /* ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.fullName = params['fullName'] || 'Guest'; 
      this.id = params['id'] ? +params['id'] : null; 
      console.log('Welcome user:', this.fullName);
      console.log('Employee ID:', this.id);
    });
  } */

  getEmployeeProfile(id: number): void {
    // Fetch the Jobseeker details by id
    this.empService.getEmployeeProfile(id).subscribe(
      (data: Employee) => {
        this.employee = data; // Set the retrieved jobseeker data
      },
      (error) => {
        console.error('Error fetching job seeker profile:', error);
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
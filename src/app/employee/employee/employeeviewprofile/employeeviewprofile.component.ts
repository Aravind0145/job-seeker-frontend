import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../employee';
import { EmployeeserviceService } from '../../../employeeservice.service';

@Component({
  selector: 'app-employeeviewprofile',
  templateUrl: './employeeviewprofile.component.html',
  styleUrl: './employeeviewprofile.component.css'
})
export class EmployeeviewprofileComponent implements OnInit {
  employee: Employee | null = null;
  id: number | null = null;
  fullName:string='';

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private empService: EmployeeserviceService
  ) {}

  ngOnInit(): void {
    // Get the 'id' from queryParams
    this.route.queryParams.subscribe(params => {
      this.fullName = params['fullName'] || 'Guest'; // If 'fullName' is not present, set it as 'Guest'
      this.id = params['id'];
      if (this.id !== null) {
        this.getEmployeeProfile(this.id);
      }
    });
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

  logout(): void {
    // Clear local storage and navigate to the front page
    localStorage.removeItem('jobseeker');
    this.router.navigate(['jobseeker/jfrontpage']);
  }
}
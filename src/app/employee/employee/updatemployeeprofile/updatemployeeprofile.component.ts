import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../employee';
import { EmployeeserviceService } from '../../../employeeservice.service';

@Component({
  selector: 'app-updatemployeeprofile',
  templateUrl: './updatemployeeprofile.component.html',
  styleUrl: './updatemployeeprofile.component.css'
})
export class UpdatemployeeprofileComponent implements OnInit {
  employee: Employee = {
    companyName: '',
    websiteUrl: '',
    industryType: '',
    fullName: '',
    officialEmail: '',
    mobileNumber: '',
    designation: '',
    password: '',

  };
  id: number | null = null;
  fullName:String='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empService: EmployeeserviceService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.fullName = params['fullName'] || 'Guest'; // If 'fullName' is not present, set it as 'Guest'

      this.id = params['id'] ? +params['id'] : null;

      if (this.id !== null) {
        this.getEmployee(this.id);
      }
    });
  }

  getEmployee(id: number): void {
    this.empService.getEmployeeProfile(id).subscribe(
      (employee: Employee) => {
        this.employee = employee;
      },
      error => {
        console.error('Error fetching employee profile:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.id !== null) {
      this.empService.updateEmployee(this.id, this.employee).subscribe(
        (updatedEmployee: Employee) => {
          alert('Profile updated successfully!');
          this.router.navigate(['/employee/emphomepage'], {
            queryParams: { id: updatedEmployee.id, fullName: updatedEmployee.fullName }
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
    // Clear local storage and navigate to the front page
    localStorage.removeItem('jobseeker');
    this.router.navigate(['jobseeker/jfrontpage']);
  }
}
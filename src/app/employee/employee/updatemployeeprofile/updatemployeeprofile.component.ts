import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../Interfaces/employee';
import { EmployeeserviceService } from '../../../Servicess/employeeservice.service';
import { ToasterService } from '../../../Servicess/toaster.service';

@Component({
  selector: 'app-updatemployeeprofile',
  templateUrl: './updatemployeeprofile.component.html',
  styleUrl: './updatemployeeprofile.component.css'
})
export class UpdatemployeeprofileComponent implements OnInit {
  employee: Employee = {
    companyName: '',
    websiteUrl: '',
    fullName: '',
    officialEmail: '',
    mobileNumber: '',
    profilePhoto:'',
    designation: '',
    password: '',

  };
  id: number | null = null;
  fullName:String='';
  isHomeActive: boolean = false;
  message: string = '';
  messageClass: string = '';
  uploadingImage: boolean = false;  // To track the uploading state
  uploadError: string = ''; 
  originalResume: Employee | null = null;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empService: EmployeeserviceService,
    private toaster:ToasterService
  ) {}

  ngOnInit(): void {
    const state = history.state;
  
    this.fullName = state.fullName || 'Guest'; // Default to 'Guest' if not present
    this.id = state.id || null; // Set 'id' if present, otherwise set to null
  
    console.log('Full Name:', this.fullName);
    console.log('Employee ID:', this.id);
  
    if (this.id !== null) {
      this.getEmployee(this.id);
    }
  }
  
  isFormModified(): boolean {
    return JSON.stringify(this.employee) !== JSON.stringify(this.originalResume);
  }

  getEmployee(id: number): void {
    this.empService.getEmployeeProfile(id).subscribe(
      (employee: Employee) => {
        this.employee = employee;
        this.originalResume = { ...employee };

      },
      error => {
        console.error('Error fetching employee profile:', error);
      }
    );
  }

  uploadImage(event: any): void {
    this.uploadingImage = true;
    this.uploadError = '';
  
    const file = event.target.files[0];
    if (!file) {
      this.uploadingImage = false;
      return;
    }
  
    // Replace this with your cloud storage upload URL and API key
    const uploadUrl = 'https://api.imgbb.com/1/upload';
    const apiKey = 'f994aa94e60bf8071dae6a9723f989ef'; // ImgBB API Key
  
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', apiKey);
  
    // Make the request using fetch to ImgBB API
    fetch(uploadUrl, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.url) {
          this.employee.profilePhoto = data.data.url;
          this.toaster.showSuccess("Image Uploaded","Success");
        } else {
          this.uploadError = 'Failed to upload image. Please try again.';
          alert(this.uploadError);
        }
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        this.uploadError = 'Failed to upload image. Please try again.';
        alert(this.uploadError);
      })
      .finally(() => {
        this.uploadingImage = false;
      });
  }

  onSubmit(): void {
    if (this.id !== null) {
      console.log('Updating employee with ID:', this.id);
      console.log('Employee data:', this.employee);
  
      this.empService.updateEmployee(this.id, this.employee).subscribe(
        (updatedEmployee: Employee) => {
          console.log('Updated Employee:', updatedEmployee);
          this.toaster.showSuccess("Updated Successfully!", "Success");
          this.message = '';
          this.messageClass = 'success-message';  // You can customize this class for styling
          setTimeout(() => {
            this.message = '';  // Clear the message
            this.messageClass = '';  // Reset the class
          }, 5000);
        },
        (error) => {
          console.error('Error updating profile:', error);
          this.toaster.showError("Error updating profile", "Error");
        }
      );
    } else {
      console.error('Employee ID is null or undefined!');
      this.toaster.showError("Invalid Employee ID", "Error");
    }
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
  }logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    localStorage.removeItem('id');
    this.router.navigateByUrl('/jfrontpage');
  }
}
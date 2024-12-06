import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmpregisterComponent } from './empregister/empregister.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmploginComponent } from './emplogin/emplogin.component';
import { EmphomepageComponent } from './emphomepage/emphomepage.component';
import { EmpforgotpasswordComponent } from './empforgotpassword/empforgotpassword.component';
import { JobPostingsComponent } from './job-postings/job-postings.component';
import { EmployeeviewprofileComponent } from './employeeviewprofile/employeeviewprofile.component';
import { UpdatemployeeprofileComponent } from './updatemployeeprofile/updatemployeeprofile.component';
import { ViewJobPostingsComponent } from './view-job-postings/view-job-postings.component';
import { ResumedetailsComponent } from './resumedetails/resumedetails.component';
import { UpdateapplicationComponent } from './updateapplication/updateapplication.component';


@NgModule({
  declarations: [
    EmpregisterComponent,
    EmploginComponent,
    EmphomepageComponent,
    EmpforgotpasswordComponent,
    JobPostingsComponent,
    EmployeeviewprofileComponent,
    UpdatemployeeprofileComponent,
    ViewJobPostingsComponent,
    ResumedetailsComponent,
    UpdateapplicationComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class EmployeeModule { }

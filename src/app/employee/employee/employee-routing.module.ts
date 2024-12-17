import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpregisterComponent } from './empregister/empregister.component';
import { EmployeeModule } from './employee.module';
import { EmploginComponent } from './emplogin/emplogin.component';
import { EmphomepageComponent } from './emphomepage/emphomepage.component';
import { EmpforgotpasswordComponent } from './empforgotpassword/empforgotpassword.component';
import { JobPostingsComponent } from './job-postings/job-postings.component';
import { EmployeeviewprofileComponent } from './employeeviewprofile/employeeviewprofile.component';
import { UpdatemployeeprofileComponent } from './updatemployeeprofile/updatemployeeprofile.component';
import { ViewJobPostingsComponent } from './view-job-postings/view-job-postings.component';
import { ResumedetailsComponent } from './resumedetails/resumedetails.component';
import { UpdateapplicationComponent } from './updateapplication/updateapplication.component';

const routes: Routes = [
  {
    path:'empregister',
    component:EmpregisterComponent
  },
  {
    path:'emplogin',
    component:EmploginComponent
  },
  {
    path:'emphomepage',
    component:EmphomepageComponent
  },
  {
    path:'empforgotpassword',
    component:EmpforgotpasswordComponent
  },
  {
    path:'postjobs',
    component:JobPostingsComponent
  },
  {
    path:'employeeprofile',
    component:EmployeeviewprofileComponent
  },
  {
    path:'employeeupdateprofile',
    component:UpdatemployeeprofileComponent
  },
  {
    path:'viewjobpostings',
    component:ViewJobPostingsComponent
  },
  {
    path:'resumedetails',
    component:ResumedetailsComponent
  },
  {
    path:'updateapplication',
    component:UpdateapplicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontpageComponent } from './jobseeker/frontpage/frontpage.component';
import { JobseekerregisterComponent } from './jobseeker/jobseekerregister/jobseekerregister.component';
import { JobseekerhomepageComponent } from './jobseeker/jobseekerhomepage/jobseekerhomepage.component';
import { UpdateresumeComponent } from './jobseeker/updateresume/updateresume.component';
import { ViewresumeComponent } from './jobseeker/viewresume/viewresume.component';
import { AppliedJobsComponent } from './jobseeker/applied-jobs/applied-jobs.component';
import { UpdateprofileComponent } from './jobseeker/updateprofile/updateprofile.component';
import { ViewprofileComponent } from './jobseeker/viewprofile/viewprofile.component';
import { JobdetailsComponent } from './jobseeker/jobdetails/jobdetails.component';
import { ForgotpasswordComponent } from './jobseeker/forgotpassword/forgotpassword.component';
import { JresumeComponent } from './jobseeker/jresume/jresume.component';
import { EmpregisterComponent } from './employee/employee/empregister/empregister.component';
import { EmploginComponent } from './employee/employee/emplogin/emplogin.component';
import { EmphomepageComponent } from './employee/employee/emphomepage/emphomepage.component';
import { EmpforgotpasswordComponent } from './employee/employee/empforgotpassword/empforgotpassword.component';
import { JobPostingsComponent } from './employee/employee/job-postings/job-postings.component';
import { EmployeeviewprofileComponent } from './employee/employee/employeeviewprofile/employeeviewprofile.component';
import { UpdatemployeeprofileComponent } from './employee/employee/updatemployeeprofile/updatemployeeprofile.component';
import { ViewJobPostingsComponent } from './employee/employee/view-job-postings/view-job-postings.component';
import { ResumedetailsComponent } from './employee/employee/resumedetails/resumedetails.component';
import { UpdateapplicationComponent } from './employee/employee/updateapplication/updateapplication.component';
import { AuthGuard } from './auth.guard';

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
    component:EmphomepageComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'empforgotpassword',
    component:EmpforgotpasswordComponent
  },
  {
    path:'postjobs',
    component:JobPostingsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'employeeprofile',
    component:EmployeeviewprofileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'employeeupdateprofile',
    component:UpdatemployeeprofileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'viewjobpostings',
    component:ViewJobPostingsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'resumedetails',
    component:ResumedetailsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'updateapplication',
    component:UpdateapplicationComponent,
    canActivate:[AuthGuard]
  },

  {
    path: 'jfrontpage', // Directly map to 'frontpage' at the root level
    component: FrontpageComponent
  },
  {
    path: 'jregister', // Direct route for registration
    component: JobseekerregisterComponent // Make sure this points to the right component
  },
  {
    path:'jobseekerhomepage',
    component:JobseekerhomepageComponent
    
  },
  
  {
    path:'jobseekerresume',
    component:JresumeComponent
  },
  {
    path:'jobseekerforgotpassword',
    component:ForgotpasswordComponent
  },
  {
    path:'jobdetails',
    component:JobdetailsComponent
  },
  {
    path:'viewprofile',
    component:ViewprofileComponent
  },
  {
    path:'updateprofile',
    component:UpdateprofileComponent
  },
  {
    path:'applyjobs',
    component:AppliedJobsComponent
  },
  {
    path:'viewresume',
    component:ViewresumeComponent
  },
  {
    path:'updateresume',
    component:UpdateresumeComponent
  },
  {
    path: 'jobseeker', // Lazy-load the jobseeker module
    loadChildren: () => import('./jobseeker/jobseeker.module').then(m => m.JobseekerModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee/employee.module').then(m => m.EmployeeModule)
  },
   {
     path: '',
    redirectTo: 'jfrontpage', // Default route
     pathMatch: 'full'
   },
   { 
    path: '**', 
  redirectTo: 'jfrontpage' // Wildcard route for undefined paths
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

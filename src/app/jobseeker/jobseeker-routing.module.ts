import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { JobseekerhomepageComponent } from './jobseekerhomepage/jobseekerhomepage.component';
import { JresumeComponent } from './jresume/jresume.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { ViewresumeComponent } from './viewresume/viewresume.component';
import { UpdateresumeComponent } from './updateresume/updateresume.component';
import { UploadphotoComponent } from './uploadphoto/uploadphoto.component';

const routes: Routes = [
  
  {
    path:'jregister',
    component:RegisterComponent
  },
  {
    path:'jfrontpage',
    component:FrontpageComponent
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
    path:'uploadphoto',
    component:UploadphotoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobseekerRoutingModule { }

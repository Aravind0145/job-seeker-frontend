import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobseekerRoutingModule } from './jobseeker-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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


@NgModule({
  declarations: [
    RegisterComponent,
    FrontpageComponent,
    JobseekerhomepageComponent,
    JresumeComponent,
    ForgotpasswordComponent,
    JobdetailsComponent,
    ViewprofileComponent,
    UpdateprofileComponent,
    AppliedJobsComponent,
    ViewresumeComponent,
    UpdateresumeComponent,
    UploadphotoComponent
  ],
  imports: [
    CommonModule,
    JobseekerRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class JobseekerModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'jobseeker',
    loadChildren: () => import('./jobseeker/jobseeker.module').then(m => m.JobseekerModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: '', 
      redirectTo: 'jobseeker/jfrontpage',
      pathMatch: 'full'
     }, // Default route
      { path: '**',
       redirectTo: 'jobseeker/jfrontpage' 
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

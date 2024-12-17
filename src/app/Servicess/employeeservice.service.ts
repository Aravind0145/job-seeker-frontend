import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Interfaces/employee';
import { map, Observable } from 'rxjs';
import { Jobpostings } from '../Interfaces/jobpostings';
import { Resume } from '../Interfaces/resume';
import { Application } from '../Interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {
  private selectedList: string="";
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  registerEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employee/register`, emp);
  }



  employeelogin(email: string, password: string): Observable<{ role: string, id: number, fullName:string }> {
    return this.http.post<{ role: string, id: number,fullName:string }>(`${this.apiUrl}/employee/login`, { email, password }).pipe(
      map(response => {
        console.log('Response from server:', response);
        if (response && response.role && response.id && response.fullName) {
          return response; // Return the response if valid
        } else {
          throw new Error('Invalid response structure');
        }
      })
    );


}


updatePasswordEmployee(email: string, password: string): Observable<any> {
  // Sending email and password in the body of the PUT request
  const updateData = {
    email: email,
    password: password
  };

  return this.http.put<any>(`${this.apiUrl}/employee/forgot-password`, updateData);
}



checkEmailExists(email: string): Observable<{ exists: boolean }> {
  return this.http.get<{ exists: boolean }>(`${this.apiUrl}/employee/update-email`, {
    params: { email }
  });
}





postJobEmployee(job:Jobpostings, id: number):Observable<Jobpostings>{
  return this.http.post<Jobpostings>(`${this.apiUrl}/employee/post-jobs/${id}`,job);
}


getEmployeeProfile(id: number): Observable<Employee> {
  return this.http.get<Employee>(`${this.apiUrl}/employee/emp-profile/${id}`);
}

updateEmployee(id: number, employee: Employee): Observable<Employee> {
  return this.http.put<Employee>(`${this.apiUrl}/employee/update-employee-profile/${id}`, employee);
}

getJobPostingsById(id: number): Observable<Jobpostings[]> {
  return this.http.get<Jobpostings[]>(`${this.apiUrl}/employee/view-jobpostings/${id}`);
}

getApplicantCount(jobPostingId: number): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/employee/applied-counts/${jobPostingId}`);
}

getResumesByJobPostingId(jobPostingId: number): Observable<Resume[]> {
  return this.http.get<Resume[]>(`${this.apiUrl}/employee/resume-details/${jobPostingId}`);
}


// employeeservice.service.ts
getApplicationsByJobPostingId(jobPostingId: number): Observable<Application[]> {
  return this.http.get<Application[]>(`${this.apiUrl}/employee/application-details/${jobPostingId}`);
}

// Update application
updateApplication(id: number, application: Application): Observable<Application> {
  return this.http.put<Application>(`${this.apiUrl}/employee/update-application/${id}`, application);
}
postJobPostingAndJobSeeker(
  jobPostingId: number,
  jobSeekerId: number,
  applicationId?: number
): Observable<Application[]> {
  // Construct the URL with path variables
  const basePath = `${this.apiUrl}/applications/${jobPostingId}/${jobSeekerId}`;
  const url = applicationId !== undefined ? `${basePath}/${applicationId}` : `${basePath}/null`; // Fallback for applicationId

  // Send POST request
  return this.http.post<Application[]>(url, {});
}


deleteJobPosting(jobPostingId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/Delete-Jobposting/${jobPostingId}`);
}

}



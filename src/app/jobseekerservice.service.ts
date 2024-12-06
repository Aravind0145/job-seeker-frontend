import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jobseeker } from './jobseeker';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Resume } from './resume';
import { Jobpostings } from './jobpostings';
import { Application } from './application';


@Injectable({
  providedIn: 'root'
})
export class JobseekerserviceService {
  private selectedList: string="";
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  registerJobSeeker(admin: Jobseeker): Observable<Jobseeker> {
    return this.http.post<Jobseeker>(`${this.apiUrl}/jobseeker/jregister`, admin);
  }

  saveResume(resume: Resume, jobseekerId: number): Observable<Resume> {
    return this.http.post<Resume>(`${this.apiUrl}/jobseeker/jobseekerresume/${jobseekerId}`, resume);
  }

  // Inside the JobseekerserviceService
checkResumeExistence(jobseekerId: number): Observable<boolean> {
  return this.http.get<boolean>(`${this.apiUrl}/jobseeker/jobseekerresume/check/${jobseekerId}`);
}

  


  jobseekerlogin(email: string, password: string): Observable<{ role: string, id: number, fullName:string }> {
    return this.http.post<{ role: string, id: number,fullName:string }>(`${this.apiUrl}/jobseeker/jfrontpage`, { email, password }).pipe(
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








  getResume(id: number): Observable<Resume> {
    return this.http.get<Resume>(`${this.apiUrl}/jobseeker/jobseekerhomepage/${id}`);
  }


  getJobPostings(page: number, size: number): Observable<{ data: Jobpostings[]; totalCount: number }> {
    return this.http.get<{ data: Jobpostings[]; totalCount: number }>(
      `${this.apiUrl}/jobseeker/listjobpostings/${page}/${size}`
    );
  }
  
  
  
  


  updatePasswordJobseeker(email: string, password: string): Observable<any> {
    // Sending email and password in the body of the PUT request
    const updateData = {
      email: email,
      password: password
    };
  
    return this.http.put<any>(`${this.apiUrl}/jobseeker/jobseekerforgotpassword`, updateData);
  }
  


  checkEmailExists(email: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/jobseeker/jfrontapge`, {
      params: { email }
    });
  }


  
  submitApplication(
    application: Application,
    jobPostingId: number,
    jobSeekerId: number,
    resumeId:number
  ): Observable<any> {
    // Construct the URL with the dynamic path parameters
    const url = `${this.apiUrl}/jobseeker/jobdetails/${jobPostingId}/${jobSeekerId}/${resumeId}`;
  
    // Send the application object in the body if needed
    return this.http.post<any>(url, application);
  }


  getJobSeekerProfile(id: number): Observable<Jobseeker> {
    return this.http.get<Jobseeker>(`${this.apiUrl}/jobseeker/viewprofile/${id}`);
  }
  
  updateJobSeeker(id: number, jobseeker: Jobseeker): Observable<Jobseeker> {
    return this.http.put<Jobseeker>(`${this.apiUrl}/jobseeker/updateprofile/${id}`, jobseeker);
  }
  
  updateResume(resume: Resume, id: number): Observable<Resume> {
    return this.http.put<Resume>(`${this.apiUrl}/jobseeker/updateresume/${id}`, resume);
  }
  


  getApplicationsByJobSeeker(jobSeekerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/jobseeker/applyjobs/${jobSeekerId}`);
  }

  withdrawApplication(jobSeekerId: number, applicationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/jobseeker/${jobSeekerId}/applications/${applicationId}`);
  }


  searchJobs(searchCriteria: any): Observable<any[]> {
    // Construct the URL by appending the search criteria directly into the path
    const url = `${this.apiUrl}/jobseeker/searchjob/${searchCriteria.jobTitle || ''}/${searchCriteria.location || ''}/${searchCriteria.experience || ''}`;

    return this.http.get<any[]>(url);
}


getResumeById(id: number): Observable<Resume> {
  return this.http.get<Resume>(`${this.apiUrl}/jobseeker/viewresume/${id}`);
}





uploadPhoto(formData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/jobseeker/uploadphoto`, formData); // No need for responseType: 'text'
}


  }

 


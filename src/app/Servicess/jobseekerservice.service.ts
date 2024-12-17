import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jobseeker } from '../Interfaces/jobseeker';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Resume } from '../Interfaces/resume';
import { Jobpostings } from '../Interfaces/jobpostings';
import { Application } from '../Interfaces/application';


@Injectable({
  providedIn: 'root'
})
export class JobseekerserviceService {
  private selectedList: string="";
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  registerJobSeeker(admin: Jobseeker): Observable<Jobseeker> {
    return this.http.post<Jobseeker>(`${this.apiUrl}/jobseeker/register`, admin);
  }

  saveResume(resume: Resume, jobseekerId: number): Observable<Resume> {
    return this.http.post<Resume>(`${this.apiUrl}/jobseeker/resume/${jobseekerId}`, resume);
  }

  // Inside the JobseekerserviceService
checkResumeExistence(jobseekerId: number): Observable<boolean> {
  return this.http.get<boolean>(`${this.apiUrl}/jobseeker/resume/check/${jobseekerId}`);
}

  


  jobseekerlogin(email: string, password: string): Observable<{ role: string, id: number, fullName:string }> {
    return this.http.post<{ role: string, id: number,fullName:string }>(`${this.apiUrl}/jobseeker/frontpage`, { email, password }).pipe(
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
    return this.http.get<Resume>(`${this.apiUrl}/jobseeker/homepage/${id}`);
  }


  getJobPostings(page: number, size: number): Observable<{ data: Jobpostings[]; totalCount: number }> {
    return this.http.get<{ data: Jobpostings[]; totalCount: number }>(
      `${this.apiUrl}/jobseeker/list-jobpostings/${page}/${size}`
    );
  }
  
  
  
  


  updatePasswordJobseeker(email: string, password: string): Observable<any> {
    // Sending email and password in the body of the PUT request
    const updateData = {
      email: email,
      password: password
    };
  
    return this.http.put<any>(`${this.apiUrl}/jobseeker/forgot-password`, updateData);
  }
  


  checkEmailExists(email: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/jobseeker/update-emails`, {
      params: { email }
    });
  }

  checkApplicationStatus(jobId: number, userId: number): Observable<{ hasApplied: boolean }> {
    return this.http.get<{ hasApplied: boolean }>(`${this.apiUrl}/applications/status`, {
      params: { jobId: jobId.toString(), userId: userId.toString() }
    });
}

  
  

  
  submitApplication(
    application: Application,
    jobPostingId: number,
    jobSeekerId: number,
    resumeId:number
  ): Observable<any> {
    // Construct the URL with the dynamic path parameters
    const url = `${this.apiUrl}/jobseeker/job-details/${jobPostingId}/${jobSeekerId}/${resumeId}`;
  
    // Send the application object in the body if needed
    return this.http.post<any>(url, application);
  }


  getJobSeekerProfile(id: number): Observable<Jobseeker> {
    return this.http.get<Jobseeker>(`${this.apiUrl}/jobseeker/view-profile/${id}`);
  }
  
  updateJobSeeker(id: number, jobseeker: Jobseeker): Observable<Jobseeker> {
    return this.http.put<Jobseeker>(`${this.apiUrl}/jobseeker/update-profile/${id}`, jobseeker);
  }
  
  updateResume(resume: Resume, id: number): Observable<Resume> {
    return this.http.put<Resume>(`${this.apiUrl}/jobseeker/update-resume/${id}`, resume);
  }
  


  getApplicationsByJobSeeker(jobSeekerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/jobseeker/applyjobs/${jobSeekerId}`);
  }

  withdrawApplication(jobSeekerId: number, applicationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/jobseeker/${jobSeekerId}/applications/${applicationId}`);
  }


  searchJobs(searchCriteria: any): Observable<any[]> {
    // Construct the URL by appending the search criteria directly into the path
    const url = `${this.apiUrl}/jobseeker/search-job/${searchCriteria.jobTitle || ''}/${searchCriteria.location || ''}/${searchCriteria.experience || ''}`;

    return this.http.get<any[]>(url);
}


getResumeById(id: number): Observable<Resume> {
  return this.http.get<Resume>(`${this.apiUrl}/jobseeker/view-resume/${id}`);
}





uploadPhoto(formData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/jobseeker/uploadphoto`, formData); // No need for responseType: 'text'
}


  }

 


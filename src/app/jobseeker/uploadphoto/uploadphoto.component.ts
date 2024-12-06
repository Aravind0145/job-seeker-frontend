import { Component } from '@angular/core';
import { JobseekerserviceService } from '../../jobseekerservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-uploadphoto',
  templateUrl: './uploadphoto.component.html',
  styleUrl: './uploadphoto.component.css'
})
export class UploadphotoComponent {
  profilePhotoUrl: string | null = null;

  constructor(private http: HttpClient) {}

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const formData = new FormData();
      formData.append('file', file);

      // Make sure you're hitting the correct API endpoint
      this.http.post('http://localhost:8080/api/jobseeker/uploadphoto', formData).subscribe({
        next: (response: any) => {
          this.profilePhotoUrl = response; // Assuming the backend returns the URL
          console.log('Uploaded photo URL:', this.profilePhotoUrl);
          alert('Photo uploaded successfully!');
        },
        error: (error) => {
          console.error('Photo upload failed:', error);
          alert('Failed to upload photo. Please try again.');
        }
      });
    }
  }
}

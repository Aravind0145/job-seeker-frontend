import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobseekerSharedService {
  private fullName: string = 'Guest';
  private id: number | null = null;

  setUserData(fullName: string, id: number): void {
    console.log('Setting data:', fullName, id); // Add logging for debugging
    this.fullName = fullName;
    this.id = id;
  }

  getUserData(): { fullName: string; id: number | null } {
    console.log('Getting data:', this.fullName, this.id); // Add logging for debugging
    return { fullName: this.fullName, id: this.id };
  }
  constructor() { }
}

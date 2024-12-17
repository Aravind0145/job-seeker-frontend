import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('role');

    // If user is logged in as jobseeker, redirect to jobseeker homepage
    if (isLoggedIn && role === 'jobseeker') {
      this.router.navigate(['/jobseekerhomepage']);
      return false;
    }

    // If user is logged in as employee, redirect to employee homepage
    if (isLoggedIn && role === 'employee') {
      this.router.navigate(['/emphomepage']);
      return false;
    }

    return true; // Allow access to login page if not logged in
  }
}

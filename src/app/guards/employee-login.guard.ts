import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      // Redirect to homepage if user is logged in
      this.router.navigate(['/emphomepage']);
      return false; // Prevent navigation to login page
    }

    return true; // Allow navigation to login page if user is not logged in
  }
}

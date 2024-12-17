// src/app/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // If not logged in, redirect to front page
    if (!isLoggedIn) {
      this.router.navigateByUrl('/jfrontpage');
      return next.handle(req); // or throw an error, depending on how you want to handle this
    }

    // Clone request and set Authorization header (if needed)
    const clonedRequest = req.clone({
      setHeaders: {
        // Example: add authorization token if available
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    });

    return next.handle(clonedRequest);
  }
}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log(isLoggedIn)
    // Define a set of APIs to skip the interceptor (public APIs, for example)
    const excludedUrls = ['/jobseeker/update-emails', '/jregister','/register','/update-email','/forgot-password','/employee/login']; // Add the URLs to exclude here

    
    const isExcluded = excludedUrls.some(url => req.url.includes(url));
    if (!isLoggedIn && !isExcluded) {
      this.router.navigateByUrl('/jfrontpage');
      return next.handle(req); 
    }
    if (!isExcluded) {
      const clonedRequest = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}

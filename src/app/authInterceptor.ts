// src/app/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const authReq = req.clone({
      setHeaders: {
        // Authorization: `Bearer ${this.getToken()}`
      }
    });

    // Pass on the cloned request instead of the original request
    return next.handle(authReq);
  }

  private getToken(): string {
    // Retrieve the token from storage or service
    return localStorage.getItem('authToken') || '';
  }
}

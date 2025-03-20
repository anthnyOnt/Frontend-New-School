import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthService } from '../auth/login/service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private router = inject(Router);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const clonedRequest = token ? this.addToken(request, token) : request;
    
    return next.handle(clonedRequest).pipe(
      catchError(error => this.handleAuthError(error))
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  private handleAuthError(error: any): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        this.authService.logout().subscribe(() => {
          this.router.navigate(['/login'], {
            queryParams: {
              returnUrl: this.router.url,
              message: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.'
            }
          });
        });
      } else if (error.status === 403) {
        this.router.navigate(['/access-denied']);
      }
    }
    return throwError(() => error);
  }
}

import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export const authGuard = (route: any, state: any): Observable<boolean> => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token) {
    // Token exists, allow access
    return of(true);
  } else {
    // No token, redirect to login
    router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return of(false);
  }
};
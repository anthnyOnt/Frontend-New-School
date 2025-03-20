import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/login/service/auth.service';

export const authGuard = (route: any, state: any): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateToken().pipe(
    tap(isValid => {
      if (!isValid) {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
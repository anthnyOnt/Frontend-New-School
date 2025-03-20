import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/login/service/auth.service';

export const roleGuard = (route: any, state: any): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateToken().pipe(
    map(isValid => {
      if (!isValid) {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
      
      // Verificar el rol requerido
      const requiredRole = route.data?.role;
      if (!requiredRole) {
        return true; // Si no se especifica un rol, permitir acceso
      }
      
      const hasRole = authService.hasRole(requiredRole);
      if (!hasRole) {
        router.navigate(['/access-denied']);
        return false;
      }
      
      return true;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};

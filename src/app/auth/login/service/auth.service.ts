import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, delay } from 'rxjs/operators';
import { usuario } from '../../../core/interfaces/usuario';
import { LoginRequest, LoginResponse } from '../../../core/interfaces/auth';
import { environment } from '../../../../environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL base para las APIs de autenticación
  private apiUrl = environment.apiUrl + '/auth';
  
  // BehaviorSubject para el usuario actual
  private currentUserSubject: BehaviorSubject<usuario | null>;
  public currentUser: Observable<usuario | null>;
  
  // BehaviorSubject para el estado de autenticación
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated: Observable<boolean>;
  
  // Mock de base de datos de usuarios
  private mockUsuarios: any[] = [
    { 
      id: 1, 
      ci: 12345678,
      nombre: 'Admin', 
      apellido: 'Sistema',
      email: 'admin@example.com',
      password: 'admin123', 
      rol: 'admin'
    },
    { 
      id: 2,
      ci: 87654321,
      nombre: 'Usuario', 
      apellido: 'Estudiante',
      email: 'estudiante@example.com',
      password: 'estudiante123', 
      rol: 'estudiante'
    },
    { 
      id: 3,
      ci: 24681012,
      nombre: 'Usuario', 
      apellido: 'Profesor',
      email: 'profesor@example.com',
      password: 'profesor123', 
      rol: 'profesor'
    }
  ];
  
  // Variable para controlar si usamos el mock o el backend real
  private useMockData = environment.useMockData;

  constructor(private http: HttpClient) {
    // Inicializar el BehaviorSubject con el usuario del localStorage si existe
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<usuario | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
    
    // Inicializar el estado de autenticación basado en la existencia de un token
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(
      !!localStorage.getItem('token')
    );
    this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
  }

  // Getter para obtener fácilmente el valor actual del usuario
  public get currentUserValue(): usuario | null {
    return this.currentUserSubject.value;
  }

  // Método de login que soporta tanto mock como backend real
  login(credentials: LoginRequest): Observable<LoginResponse> {
    if (this.useMockData) {
      return this.mockLogin(credentials);
    } else {
      console.log(this.apiUrl);
      return this.httpLogin(credentials);
    }
  }

  // Implementación del login con mock data
  private mockLogin(credentials: LoginRequest): Observable<LoginResponse> {
    // Simulamos un delay para imitar la latencia de red
    return new Observable<LoginResponse>(observer => {
      setTimeout(() => {
        const usuario = this.mockUsuarios.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (usuario) {
          // Simular un token JWT
          const token = `mock-jwt-token-${Date.now()}-${usuario.email}`;
          
          // No enviamos la contraseña en la respuesta
          const usuarioSinPassword = { ...usuario };
          delete usuarioSinPassword.password;
          
          // Guardar en localStorage
          localStorage.setItem('currentUser', JSON.stringify(usuarioSinPassword));
          localStorage.setItem('token', token);
          
          // Actualizar los BehaviorSubjects
          this.currentUserSubject.next(usuarioSinPassword);
          this.isAuthenticatedSubject.next(true);
          
          observer.next({
            token,
            usuario: usuarioSinPassword
          });
        } else {
          observer.error('Email o contraseña incorrectos');
        }
        observer.complete();
      }, 800); // 800ms de delay para simular latencia
    });
  }

  // Implementación del login con backend real
  private httpLogin(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          // Guardar en localStorage
          console.log(response);
          localStorage.setItem('currentUser', JSON.stringify(response.usuario));
          localStorage.setItem('token', response.token);
          
          // Actualizar los BehaviorSubjects
          this.currentUserSubject.next(response.usuario);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(this.handleError)
      );
  }

  // Implementación del logout con backend real
  logout(): void {
    // Clear localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  
    // Update BehaviorSubjects
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  // Verificar si el token actual es válido (útil para guards)
  validateToken(): Observable<boolean> {
    if (this.useMockData) {
      // En modo mock, simplemente verificamos si hay token
      return of(!!localStorage.getItem('token')).pipe(delay(300));
    } else {
      // En modo real, validamos con el backend
      const token = localStorage.getItem('token');
      if (!token) {
        return of(false);
      }
      
      return this.http.post<{ valid: boolean }>(`${this.apiUrl}/validate-token`, { token })
        .pipe(
          map(response => response.valid),
          catchError(() => of(false))
        );
    }
  }

  // Refrescar información del perfil de usuario
  refreshUserProfile(): Observable<usuario> {
    if (this.useMockData) {
      // En modo mock, retornamos el usuario almacenado
      const userStr = localStorage.getItem('currentUser');
      if (!userStr) {
        return throwError('No hay usuario autenticado');
      }
      return of(JSON.parse(userStr)).pipe(delay(300));
    } else {
      // En modo real, obtenemos la info actualizada del backend
      return this.http.get<usuario>(`${this.apiUrl}/me`)
        .pipe(
          tap(usuario => {
            // Actualizar el usuario en localStorage y en el BehaviorSubject
            localStorage.setItem('currentUser', JSON.stringify(usuario));
            this.currentUserSubject.next(usuario);
          }),
          catchError(this.handleError)
        );
    }
  }

  // Método para actualizar la información del usuario (por ejemplo, después de editar perfil)
  updateCurrentUser(usuario: usuario): void {
    // Actualizar localStorage
    localStorage.setItem('currentUser', JSON.stringify(usuario));
    
    // Actualizar BehaviorSubject
    this.currentUserSubject.next(usuario);
  }

  // Obtener el nombre completo del usuario actual
  getNombreCompleto(): string {
    const usuario = this.currentUserValue;
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : '';
  }

  // Verificar si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    const usuario = this.currentUserValue;
    return usuario ? usuario.rol === role : false;
  }

  // Verificar si el usuario tiene uno de varios roles
  hasAnyRole(roles: string[]): boolean {
    const usuario = this.currentUserValue;
    return usuario ? roles.includes(usuario.rol) : false;
  }

  // Manejador de errores HTTP centralizado
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del backend
      if (error.status === 401) {
        errorMessage = 'No autorizado. Por favor, inicie sesión nuevamente.';
      } else if (error.status === 403) {
        errorMessage = 'No tiene permisos para acceder a este recurso.';
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error ${error.status}: ${error.statusText}`;
      }
    }
    
    return throwError(errorMessage);
  }


  // auth.service.ts - Añadir este método
  register(user: any): Observable<any> {
      return this.httpRegister(user);
  }


  private httpRegister(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user)
      .pipe(catchError(this.handleError));
  }

  getRolUsuario(): string | null {
    const user = this.currentUserSubject.value;
    if (user) {
      try {
        return user.rol;
      } catch (error) {
        console.error('Error al obtener rol de usuario', error);
        return null;
      }
    }
    return null;
  }

  getProfesorId(): number | null {
    const currentUser = this.currentUserValue;
    if (!currentUser || typeof currentUser.id !== 'number') {
      console.error('El usuario actual no tiene un ID válido.');
      return null;
    }
    return currentUser.id;
  }
}
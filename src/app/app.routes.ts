import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarEstudianteComponent } from './admin/pages/estudiantes/registrar-estudiante/registrar-estudiante.component';
import { VerEstudiantesComponent } from './admin/pages/estudiantes/ver-estudiantes/ver-estudiantes.component';
import { GradosPageComponent } from './admin/pages/grados/grados-page/grados-page.component';
import { GradoDetailsComponent } from './admin/pages/grados/grado-details/grado-details.component';
import { ProfesoresPageComponent } from './admin/pages/profesores/profesores-page/profesores-page.component';
import { AdminMainComponent } from './admin/pages/main/main.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './auth/register/register/register.component';
import { CursosComponent } from './admin/pages/cursos/cursos-page/cursos.component';
import { CursoDetailsComponent } from './admin/pages/cursos/curso-details/curso-details.component';
import { CursoPageComponent } from './estudiante/pages/curso-page/curso-page.component';
import { ProfesorMainComponent } from './profesor/paginas/main/main.component';
import { EstudianteMainComponent } from './estudiante/pages/estudiante-main/estudiante-main.component';
import { TareaPageComponent } from './estudiante/pages/tarea-page/tarea-page.component';
import { CursoDetalleComponent } from './profesor/paginas/curso-detalle/curso-detalle.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  // Página principal pública
  { path: '', component: HomeComponent, pathMatch: 'full' },

  // Rutas de autenticación públicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Admin routes
  {
    path: 'admin',
    canActivate: [authGuard],
    //data: { roles: ['admin'] },
    children: [
      { path: '', component: AdminMainComponent },
      { path: 'home', component: HomeComponent },
      { path: 'registrarestudiantes', component: RegistrarEstudianteComponent },
      { path: 'estudiantes', component: VerEstudiantesComponent },
      { path: 'grados', component: GradosPageComponent },
      { path: 'grados/:id', component: GradoDetailsComponent },
      { path: 'profesores', component: ProfesoresPageComponent },
      { path: 'cursos', component: CursosComponent },
      { path: 'cursos/:cursoId', component: CursoDetailsComponent },
    ]
  },

  // Teacher routes
  {
    path: 'profesor',
    canActivate: [authGuard],
    //data: { roles: ['teacher'] },
    children: [
      { path: '', component: ProfesorMainComponent },
      { path: 'cursos', component: ProfesorMainComponent },
      { path: 'cursos/:cursoId', component: CursoDetalleComponent },
      // Add more teacher-specific views here
    ]
  },

  // Student routes
  {
    path: 'estudiante',
    //canActivate: [authGuard],
    //data: { roles: ['student'] },
    children: [
      { path: '', component: EstudianteMainComponent },
      { path: 'cursos', component: CursoPageComponent },
      { path: 'cursos/:cursoId', component: CursoDetailsComponent },
      { path: 'tareas/:tareaId', component: TareaPageComponent}
      // Add more student-specific views here
    ]
  },

  // Fallback
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

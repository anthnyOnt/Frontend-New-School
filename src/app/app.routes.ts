import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarEstudianteComponent } from './admin/pages/registrar-estudiante/registrar-estudiante.component';
import { VerEstudiantesComponent } from './admin/pages/ver-estudiantes/ver-estudiantes.component';
import { GradosPageComponent } from './admin/pages/grados/grados-page/grados-page.component';
import { ProfesoresPageComponent } from './admin/pages/profesores/profesores-page/profesores-page.component';
import { MainComponent } from './admin/pages/main/main.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './auth/register/register/register.component';
import { CursosComponent } from './admin/pages/cursos/cursos.component';
import { CursoFormComponent } from './admin/pages/curso-form/curso-form.component';

export const routes: Routes = [
  // Ruta por defecto que carga el LoginComponent
  { path: '', component: LoginComponent, pathMatch: 'full' },

  // Rutas protegidas por authGuard
  { path: 'main', component: MainComponent, canActivate: [authGuard] },
  { path: 'registrarestudiantes', component: RegistrarEstudianteComponent, canActivate: [authGuard] },
  { path: 'estudiantes', component: VerEstudiantesComponent, canActivate: [authGuard] },
  { path: 'grados', component: GradosPageComponent, canActivate: [authGuard] },
  { path: 'profesores', component: ProfesoresPageComponent, canActivate: [authGuard] },
  { path: 'cursos', component: CursosComponent},

  // Ruta de registro para usuarios nuevos
  { path: 'register', component: RegisterComponent },

  // Ruta comodín para redirigir a la página de login si no se encuentra ninguna coincidencia
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

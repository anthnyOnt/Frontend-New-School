import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarEstudianteComponent } from './admin/pages/registrar-estudiante/registrar-estudiante.component'
import { VerEstudiantesComponent } from './admin/pages/ver-estudiantes/ver-estudiantes.component';
import { GradosPageComponent } from './admin/pages/grados/grados-page/grados-page.component';
import { MainComponent } from './admin/pages/main/main.component';
import { ProfesoresPageComponent } from './admin/pages/profesores/profesores-page/profesores-page.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'registrarestudiantes', component: RegistrarEstudianteComponent},
    {path: 'estudiantes', component: VerEstudiantesComponent},
    {path: 'grados', component: GradosPageComponent},
    {path: 'profesores', component: ProfesoresPageComponent}
];

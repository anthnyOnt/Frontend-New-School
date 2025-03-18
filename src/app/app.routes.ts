import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarEstudianteComponent } from './admin/pages/registrar-estudiante/registrar-estudiante.component'
import { VerEstudiantesComponent } from './admin/pages/ver-estudiantes/ver-estudiantes.component';
import { GradosPageComponent } from './admin/pages/grados/grados-page/grados-page.component';


export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'registrar', component: RegistrarEstudianteComponent},
    {path: 'estudiantes', component: VerEstudiantesComponent},
    {path: 'grados', component: GradosPageComponent}
];

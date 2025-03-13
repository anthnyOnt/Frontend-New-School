import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarEstudianteComponent } from './admin/pages/registrar-estudiante/registrar-estudiante.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'registrar', component: RegistrarEstudianteComponent}
    
];

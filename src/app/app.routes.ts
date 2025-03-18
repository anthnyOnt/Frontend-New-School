import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { GradosPageComponent } from './admin/pages/grados/grados-page/grados-page.component';
import { ProfesoresPageComponent } from './admin/pages/profesores/profesores-page/profesores-page.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'grados', component: GradosPageComponent },
    { path: 'profesores', component: ProfesoresPageComponent }
];

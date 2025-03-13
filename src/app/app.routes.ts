import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { GradosPageComponent } from './admin/pages/grados-page/grados-page.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    { path: 'grados', component: GradosPageComponent }
];

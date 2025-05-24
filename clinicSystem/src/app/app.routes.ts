import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { adminGuard } from './core/guards/Admin/admin.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DoctorLayoutComponent } from './layouts/doctor-layout/doctor-layout.component';
import { roleGuard } from './core/guards/Role/role.guard';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';

import { AppointmentService } from './core/services/Appointment/appointment.service';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    canActivateChild: [adminGuard], 
    children: [
      { path: 'dashboard', component: AdminLayoutComponent },
      // { path: 'users', component: UserListComponent }
    ],
  },
  {
    path: 'doctor',
    canActivateChild: [roleGuard],
    data: { roles: ['doctor'] }, 
    children: [{ path: 'dashboard', component: DoctorLayoutComponent }],
  },
  {
    path: 'patient',
    canActivateChild: [roleGuard],
    data: { roles: ['patient'] },
    children: [{ path: 'dashboard', component: PatientLayoutComponent }],
  },
  { path: '**', component: NotFoundComponent },
];

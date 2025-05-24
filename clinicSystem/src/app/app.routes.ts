import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { adminGuard } from './core/guards/Admin/admin.guard';
import { roleGuard } from './core/guards/Role/role.guard';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DoctorLayoutComponent } from './layouts/doctor-layout/doctor-layout.component';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';
import { AppointmentsComponent } from './pages/doctor/appointments/appointments.component';
import { ProfileComponent } from './pages/patient/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Admin routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivateChild: [adminGuard],
    children: [
      { path: 'dashboard', component: AdminLayoutComponent },
    ],
  },

  // Doctor routes
  {
    path: 'doctor',
    component: DoctorLayoutComponent,
    canActivateChild: [roleGuard],
    data: { roles: ['doctor'] },
    children: [
      { path: 'dashboard', component: DoctorDashboardComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // Patient routes
  {
    path: 'patient',
    component: PatientLayoutComponent,
    canActivateChild: [roleGuard],
    data: { roles: ['patient'] },
    children: [{ path: 'dashboard', component: PatientLayoutComponent }],
  },

  // 404
  { path: '**', component: NotFoundComponent },
];

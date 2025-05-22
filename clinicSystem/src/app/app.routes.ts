import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { authGuard } from './core/guards/Auth/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { adminGuard } from './core/guards/Admin/admin.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DoctorLayoutComponent } from './layouts/doctor-layout/doctor-layout.component';
import { AppointmentsComponent } from './pages/doctor/appointments/appointments.component';
import { roleGuard } from './core/guards/Role/role.guard';
import { AppointmentService } from './core/services/Appointment/appointment.service';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [authGuard], // فقط المستخدمين المسجلين يسمح لهم بالدخول
  // },
  {
    path: 'admin',
    canActivateChild: [adminGuard], // يفترض أن adminGuard يتحقق من دور admin
    children: [
      { path: 'admin-dashboard', component: AdminLayoutComponent },
      // { path: 'users', component: UserListComponent }
    ],
  },
  {
    path: 'doctor',
    canActivateChild: [roleGuard],
    data: { roles: ['doctor'] }, // roles هنا تستخدم بواسطة roleGuard
    children: [{ path: 'dashboard', component: DoctorLayoutComponent }],
  },
  {
    path: 'patient',
    canActivateChild: [roleGuard],
    data: { roles: ['patient'] },
    children: [{ path: 'appointments', component: AppointmentsComponent }],
  },
  { path: '**', component: NotFoundComponent }, // صفحة الخطأ 404
];

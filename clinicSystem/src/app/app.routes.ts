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

import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { ProfileComponent } from './pages/patient/profile/profile.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { DoctorListComponent } from './pages/patient/doctor-list/doctor-list.component';
import { BookAppointmentComponent } from './pages/patient/book-appointment/book-appointment.component';
import { MyAppointmentsComponent } from './pages/patient/my-appointments/my-appointments.component';
import { DoctorDashboardComponent } from './pages/doctor/dashboard/dashboard.component';
import { roleGuard } from './core/guards/Role/role.guard';
import { authGuard } from './core/guards/Auth/auth.guard';



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
      // { path: 'dashboard', component: AdminDashboardComponent },
    ],
  },

  // Doctor routes
  {
    path: 'doctor',
    component: DoctorLayoutComponent,
    canActivateChild: [authGuard],
    // canActivateChild: [roleGuard],
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
    canActivateChild: [authGuard],
    data: { roles: ['patient'] },
    children: [
      { path: 'dashboard', component: PatientDashboardComponent },
      { path: 'doctors', component: DoctorListComponent },           
      { path: 'book-appointment/:doctorId', component: BookAppointmentComponent }, 
      { path: 'appointments', component: MyAppointmentsComponent },  
      { path: 'profile', component: ProfileComponent },              
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },


    // canActivateChild: [roleGuard],
    data: { roles: ['patient'] },
    children: [
      { path: 'dashboard', component: PatientDashboardComponent },
      { path: 'doctors', component: DoctorListComponent },           // تصفح قائمة الأطباء مع فلاتر
      { path: 'book-appointment/:doctorId', component: BookAppointmentComponent }, // حجز موعد مع طبيب (باستخدام معرّف الطبيب)
      { path: 'appointments', component: MyAppointmentsComponent },  // عرض قائمة المواعيد الخاصة بالمريض
      { path: 'profile', component: ProfileComponent },              // عرض وتعديل الملف الشخصي
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // 404
  { path: '**', component: NotFoundComponent },
];

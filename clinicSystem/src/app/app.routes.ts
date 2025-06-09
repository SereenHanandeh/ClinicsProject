import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DoctorLayoutComponent } from './layouts/doctor-layout/doctor-layout.component';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';
import { AppointmentsComponent } from './pages/doctor/appointments/appointments.component';
import { DoctorListComponent } from './pages/patient/doctor-list/doctor-list.component';
import { BookAppointmentComponent } from './pages/patient/book-appointment/book-appointment.component';
import { MyAppointmentsComponent } from './pages/patient/my-appointments/my-appointments.component';
import { DoctorDashboardComponent } from './pages/doctor/dashboard/dashboard.component';
import { ProfileComponent } from './pages/patient/profile/profile.component';
import { DocProfileComponent } from './pages/doctor/doc-profile/doc-profile.component';
import { ManageDoctorsComponent } from './pages/admin/manage-doctors/manage-doctors.component';
import { ManageClinicsComponent } from './pages/admin/manage-clinics/manage-clinics.component';
import { ManageDrugsComponent } from './pages/admin/manage-drugs/manage-drugs.component';
import { ManageDiagnosesComponent } from './pages/admin/manage-diagnoses/manage-diagnoses.component';
import { AddDoctorComponent } from './pages/admin/add-doctor/add-doctor.component';
import { EditDoctorComponent } from './pages/admin/edit-doctor/edit-doctor.component';
import { WelcomComponent } from './welcom/welcom.component';
import { roleGuard } from './core/guards/Auth/auth.guard';
import { PatientDashboardComponent } from './pages/patient/patient-dashboard/patient-dashboard.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'welcome-page',
    loadComponent: () =>
      import('./welcom/welcom.component').then((m) => m.WelcomComponent),
  },
  { path: 'home', component: HomeComponent },

  // Admin routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivateChild: [roleGuard('admin')],
    children: [
      { path: 'home', component: AdminHomeComponent },
      { path: 'manageDoctor', component: ManageDoctorsComponent },
      { path: 'editDoctor/:id', component: EditDoctorComponent },
      { path: 'addDoctor', component: AddDoctorComponent },
      { path: 'manageClinic', component: ManageClinicsComponent },
      { path: 'manageDrugs', component: ManageDrugsComponent },
      { path: 'manageDiagnoses', component: ManageDiagnosesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // Doctor routes
  {
    path: 'doctor',
    component: DoctorLayoutComponent,
    canActivateChild: [roleGuard('doctor')],
    children: [
      { path: 'dashboard', component: DoctorDashboardComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'profile', component: DocProfileComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // Patient routes
  {
    path: 'patient',
    component: PatientLayoutComponent,
    canActivateChild: [roleGuard('patient')],
    children: [
      { path: 'dashboard', component: PatientDashboardComponent },
      { path: 'doctors', component: DoctorListComponent },
      {
        path: 'book-appointment/:doctorId',
        component: BookAppointmentComponent,
      },
      { path: 'appointments', component: MyAppointmentsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // 404
  { path: '**', component: NotFoundComponent },
];

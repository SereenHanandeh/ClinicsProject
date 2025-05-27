import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../core/services/Patient/patient.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { forkJoin } from 'rxjs';
import { Doctor } from '../../../core/models/doctor.model';
import { Clinic } from '../../../core/models/clinic.model';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
})
export class MyAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  doctors: Doctor[] = [];
  clinics: Clinic[] = [];
  userId: number | null = null;

  doctorMap = new Map<number, Doctor>();
  clinicMap = new Map<number, Clinic>();

  constructor(
    private patientService: PatientService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    console.log('Current userId:', this.userId);

    if (this.userId != null) {
      forkJoin({
        appointments: this.patientService.getMyAppointments(this.userId),
        doctors: this.patientService.getDoctors(),
        clinics: this.patientService.getClinics(),
      }).subscribe(({ appointments, doctors, clinics }) => {
        this.appointments = appointments;

        // تحويل id للأطباء إلى رقم
        this.doctors = doctors.map((doc) => ({
          ...doc,
          id: Number(doc.id),
          clinicId: Number(doc.clinicId),
        }));

        // تحويل id للعيادات إلى رقم
        this.clinics = clinics.map((clinic) => ({
          ...clinic,
          id: Number(clinic.id),
        }));
      });
    } else {
      console.warn('User not logged in.');
    }
  }

  getDoctorName(doctorId: number): string {
    const doctor = this.doctors.find((d) => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown Doctor';
  }

  getClinicName(doctorId: number): string {
    const doctor = this.doctors.find((d) => d.id === doctorId);
    if (!doctor) return 'Unknown Clinic';
    const clinic = this.clinics.find((c) => c.id === doctor.clinicId);
    return clinic ? clinic.name : 'Unknown Clinic';
  }

  cancelAppointment(appointmentId: number): void {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    this.patientService.deleteAppointment(appointmentId).subscribe({
      next: () => {
        this.appointments = this.appointments.filter(
          (app) => app.id !== appointmentId
        );
        alert('Appointment canceled successfully.');
      },
      error: (err) => {
        console.error('Error canceling appointment:', err);
        alert('Failed to cancel the appointment. Please try again.');
      },
    });
  }
}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Patient } from '../../../core/models/patient.model';
import { Appointment } from '../../../core/models/appointment.model';
import { Doctor } from '../../../core/models/doctor.model';
import { PatientService } from '../../../core/services/Patient/patient.service';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from "../../../shared/pips/translate.pipe";

@Component({
  selector: 'app-patient-dashboard',
  imports: [RouterModule, CommonModule, FormsModule, TranslatePipe],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss',
})
export class PatientDashboardComponent {
  patient: Patient | null = null;
  appointments: Appointment[] = [];
  doctors: Doctor[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private patientService: PatientService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const patientId = this.authService.getCurrentUserId();
    if (!patientId) {
      this.errorMessage = 'User not logged in.';
      this.isLoading = false;
      return;
    }

    this.patientService.getPatientById(patientId.toString()).subscribe({
      next: (patientData) => {
        this.patient = patientData;
      },
      error: () => {
        this.errorMessage = 'Failed to load patient data.';
        this.isLoading = false;
      },
    });

    // جلب الأطباء أولاً
    this.patientService.getDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;

        // ثم جلب المواعيد بعد تحميل الأطباء
        this.patientService.getMyAppointments(patientId).subscribe({
          next: (appointments) => {
            this.appointments = appointments;
            this.isLoading = false;
          },
          error: () => {
            this.errorMessage = 'Failed to load appointments.';
            this.isLoading = false;
          },
        });
      },
      error: () => {
        this.errorMessage = 'Failed to load doctors.';
        this.isLoading = false;
      },
    });
  }
  getDoctorName(doctorId: number): string {
    // console.log('Looking for doctorId:', doctorId);
    const doctor = this.doctors.find((d) => d.id === doctorId);
    if (!doctor) {
      console.warn('Doctor not found for ID:', doctorId, this.doctors);
    }
    return doctor ? doctor.name : 'Unknown Doctor';
  }

  cancelAppointment(appointmentId: number): void {
    const confirmed = confirm(
      'Are you sure you want to cancel this appointment?'
    );
    if (!confirmed) {
      return; 
    }

    this.patientService.deleteAppointment(Number(appointmentId)).subscribe({
      next: () => {
        // console.log('Appointment deleted successfully');
        this.appointments = this.appointments.filter(
          (a) => a.id !== appointmentId
        );
      },
      error: (err) => {
        console.error('Error deleting appointment:', err);
      },
    });
  }
}

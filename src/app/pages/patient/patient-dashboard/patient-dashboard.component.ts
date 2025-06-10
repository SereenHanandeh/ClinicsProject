import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Patient } from '../../../core/models/patient.model';
import { Appointment } from '../../../core/models/appointment.model';
import { Doctor } from '../../../core/models/doctor.model';
import { PatientService } from '../../../core/services/Patient/patient.service';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../shared/pips/translate.pipe';

@Component({
  selector: 'app-patient-dashboard',
  imports: [RouterModule, CommonModule, FormsModule, TranslatePipe],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss',
})
export class PatientDashboardComponent {
  patient: Patient | null = null;
  errorMessage = '';

  constructor(
    private patientService: PatientService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const patientId = this.authService.getCurrentUserId();
    if (!patientId) {
      this.errorMessage = 'User not logged in.';
      return;
    }

    this.patientService.getPatientById(patientId.toString()).subscribe({
      next: (patientData) => {
        this.patient = patientData;
      },
      error: () => {
        this.errorMessage = 'Failed to load patient data.';
      },
    });
  }
}

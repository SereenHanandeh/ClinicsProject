import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  Appointment,
  ApprovalStatus,
} from '../../../core/models/appointment.model';
import { AppointmentService } from '../../../core/services/Appointment/appointment.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  selectedAppointment?: Appointment;
  errorMessage: string = '';
  successMessage: string = '';
  filterForm = new FormGroup({
    name: new FormControl(''),
  });
  patients: any[] = [];

  detailsForm = new FormGroup({
    diagnosis: new FormControl(''),
    drugs: new FormControl(''),
    payment: new FormControl(''),
  });

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.loadPatients();
  }

  loadPatients(): void {
    this.appointmentService.getPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
      },
      error: () => {
        this.errorMessage = 'Failed to load patients.';
      },
    });
  }

  loadAppointments(): void {
    this.appointmentService.getDoctorAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        this.patients = this.extractPatients(appointments);
      },
      error: () => {
        this.errorMessage = 'Failed to load appointments.';
      },
    });
  }

  extractPatients(appointments: Appointment[]): any[] {
    const map = new Map<number, any>();
    appointments.forEach((app) => {
      if (app.patientId && !map.has(app.patientId)) {
        map.set(app.patientId, app.patientId);
      }
    });
    return Array.from(map.values());
  }

  selectAppointment(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    this.successMessage = '';
    this.errorMessage = '';

    if (appointment.details) {
      this.detailsForm.patchValue({
        diagnosis: appointment.details.diagnosis,
        drugs: appointment.details.drugs.join(', '),
        payment: appointment.details.payment.toString(),
      });
    }
  }

  respond(status: ApprovalStatus): void {
    if (!this.selectedAppointment) {
      this.errorMessage = 'No appointment selected.';
      return;
    }

    const updatedDetails = {
      diagnosis: this.detailsForm.value.diagnosis || '',
      drugs: (this.detailsForm.value.drugs || '')
        .split(',')
        .map((d) => d.trim()),
      payment: Number(this.detailsForm.value.payment) || 0,
    };

    const updatedAppointment: Appointment = {
      ...this.selectedAppointment,
      status: status,
      details: updatedDetails,
    };

    this.appointmentService
      .updateAppointmentStatus(this.selectedAppointment.id, status)
      .subscribe({
        next: () => {
          this.successMessage = `Appointment ${status}`;
          this.selectedAppointment!.status = status;
          this.selectedAppointment!.details = updatedDetails;
        },
        error: () => {
          this.errorMessage = 'Failed to update appointment status.';
        },
      });
  }

  getAppointmentsForPatient(patientId: number): Appointment[] {
    return this.appointments.filter((a) => a.patientId === patientId);
  }

  get filteredPatients(): any[] {
    const nameFilter = this.filterForm.value.name?.toLowerCase() || '';
    return this.patients.filter((p) =>
      p.name.toLowerCase().includes(nameFilter)
    );
  }
}

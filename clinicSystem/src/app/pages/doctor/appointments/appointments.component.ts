import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../core/services/Appointment/appointment.service';
import { ReactiveFormsModule } from '@angular/forms';

import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-list',

import { Component } from '@angular/core';
import { Appointment, ApprovalStatus } from '../../../core/models/appointment.model';
import { AppointmentService } from '../../../core/services/Appointment/appointment.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PatientHistoryComponent } from "../patient-history/patient-history.component";

@Component({
  selector: 'app-appointments',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PatientHistoryComponent],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],

  imports: [CommonModule, ReactiveFormsModule],
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];
  appointments: any[] = [];

  filterForm = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private AppointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.AppointmentService.getPatients().subscribe(
      (data) => (this.patients = data)
    );
    this.AppointmentService.getAppointments().subscribe(
      (data) => (this.appointments = data)
    );
  }

  getAppointmentsForPatient(patientId: string | number): any[] {
    return this.appointments.filter((app) => app.patientId === patientId);
  }

  get filteredPatients(): any[] {
    const nameFilter = this.filterForm.value.name?.toLowerCase() || '';
    return this.patients.filter((p) =>
      p.name.toLowerCase().includes(nameFilter)
    );

export class AppointmentsComponent {
   appointments: Appointment[] = [];
  selectedAppointment?: Appointment;
  errorMessage: string = '';
  successMessage: string = '';
  detailForm!: FormGroup;

  constructor(
    private appointmentService: AppointmentService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.initForm();
  }

  initForm(): void {
    this.detailForm = this.fb.group({
      diagnosis: [''],
      drugs: [''], 
      payment: [0]
    });
  }

  loadAppointments(): void {
    this.appointmentService.getDoctorAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments;
      },
      error: () => {
        this.errorMessage = 'Failed to load appointments.';
      }
    });
  }

  selectAppointment(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    this.errorMessage = '';
    this.successMessage = '';

    if (appointment.details) {
      this.detailForm.setValue({
        diagnosis: appointment.details.diagnosis,
        drugs: appointment.details.drugs.join(', '),
        payment: appointment.details.payment
      });
    } else {
      this.detailForm.reset({ diagnosis: '', drugs: '', payment: 0 });
    }
  }

  respond(status: ApprovalStatus): void {
    if (!this.selectedAppointment) {
      this.errorMessage = 'No appointment selected.';
      return;
    }

    this.appointmentService.updateAppointmentStatus(this.selectedAppointment.id, status).subscribe({
      next: () => {
        this.successMessage = `Appointment ${status}`;
        this.selectedAppointment!.status = status;

        const index = this.appointments.findIndex(a => a.id === this.selectedAppointment!.id);
        if (index !== -1) {
          this.appointments[index].status = status;
        }
      },
      error: () => {
        this.errorMessage = 'Failed to update appointment status.';
      }
    });
  }

  saveDetails(): void {
    if (!this.selectedAppointment) {
      this.errorMessage = 'No appointment selected.';
      return;
    }

    const formData = this.detailForm.value;
    const updatedDetails = {
      diagnosis: formData.diagnosis,
      drugs: formData.drugs.split(',').map((d: string) => d.trim()),
      payment: formData.payment
    };

    this.appointmentService.updateAppointmentDetails(this.selectedAppointment.id, updatedDetails).subscribe({
      next: () => {
        this.successMessage = 'Appointment details saved.';
        this.selectedAppointment!.details = updatedDetails;
      },
      error: () => {
        this.errorMessage = 'Failed to save appointment details.';
      }
    });
  }
}
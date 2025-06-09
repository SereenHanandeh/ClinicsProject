import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Appointment,
  ApprovalStatus,
} from '../../../core/models/appointment.model';
import { AppointmentService } from '../../../core/services/Appointment/appointment.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  selectedAppointment?: Appointment;
  errorMessage: string = '';
  successMessage: string = '';
  detailsVisible: boolean = false;

  filterForm = new FormGroup({
    name: new FormControl(''),
  });

  detailsForm = new FormGroup({
    diagnosis: new FormControl(''),
    drugs: new FormControl(''),
    payment: new FormControl(''),
  });

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
  this.appointmentService.getDoctorAppointments().subscribe({
    next: (appointments) => {
      // console.log('Loaded appointments:', appointments);
      this.appointments = appointments;
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = 'Failed to load appointments.';
    },
  });
}


  get filteredAppointments(): Appointment[] {
    const filterValue = this.filterForm.value.name?.toLowerCase() || '';
    return this.appointments.filter((a) =>
      a.patientName.toLowerCase().includes(filterValue)
    );
  }

  selectAppointment(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    this.successMessage = '';
    this.errorMessage = '';

    this.detailsForm.patchValue({
      diagnosis: appointment.details?.diagnosis || '',
      drugs: appointment.details?.drugs.join(', ') || '',
      payment:
        appointment.details?.payment != null
          ? String(appointment.details.payment)
          : '',
    });
  }

  toggleDetails(forceState?: boolean): void {
    if (typeof forceState === 'boolean') {
      this.detailsVisible = forceState;
    } else {
      this.detailsVisible = !this.detailsVisible;
    }
  }

  updateDetails(): void {
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

    const updatedData: Partial<Appointment> = {
      details: updatedDetails,
    };

   const appointmentId = this.selectedAppointment.id;

    this.appointmentService
      .updateAppointmentStatus(appointmentId, updatedData)
      .subscribe({
        next: () => {
          this.successMessage = 'Details updated successfully.';
          this.selectedAppointment!.details = updatedDetails;
        },
        error: () => {
          this.errorMessage = 'Failed to update details.';
        },
      });
  }

  respond(status: ApprovalStatus): void {
    if (!this.selectedAppointment) {
      this.errorMessage = 'No appointment selected.';
      return;
    }

    const updatedData: Partial<Appointment> = {
      status,
    };

const appointmentId = this.selectedAppointment.id;

    this.appointmentService
      .updateAppointmentStatus(appointmentId, updatedData)
      .subscribe({
        next: () => {
          this.successMessage = `Appointment ${status}`;
          this.selectedAppointment!.status = status;
        },
        error: () => {
          this.errorMessage = 'Failed to update appointment status.';
        },
      });
  }
}

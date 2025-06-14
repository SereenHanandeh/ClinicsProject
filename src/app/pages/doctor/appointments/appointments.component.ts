import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Appointment,
  ApprovalStatus,
} from '../../../core/models/appointment.model';
import { AppointmentService } from '../../../core/services/Appointment/appointment.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { I18nService } from '../../../core/services/i18n/i18n.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  providers: [MessageService],
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  selectedAppointment?: Appointment;
  detailsVisible: boolean = false;

  filterForm = new FormGroup({
    name: new FormControl(''),
  });

  detailsForm = new FormGroup({
    diagnosis: new FormControl(''),
    drugs: new FormControl(''),
    payment: new FormControl(''),
  });

  constructor(
    private appointmentService: AppointmentService,
    private messageService: MessageService,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getDoctorAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments;
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load appointments.',
        });
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
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No appointment selected.',
      });
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
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Details updated successfully.',
          });
          this.selectedAppointment!.details = updatedDetails;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update details.',
          });
        },
      });
  }

  respond(status: ApprovalStatus): void {
    if (!this.selectedAppointment) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No appointment selected.',
      });
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
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Appointment ${status}.`,
          });
          this.selectedAppointment!.status = status;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update appointment status.',
          });
        },
      });
  }
}

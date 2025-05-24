import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Appointment,
  ApprovalStatus,
} from '../../../core/models/appointment.model';
import { AppointmentService } from '../../../core/services/Appointment/appointment.service';

@Component({
  selector: 'app-appointments',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent {
  appointments: Appointment[] = [];
  selectedAppointment?: Appointment;
  errorMessage: string = '';
  successMessage: string = '';
  filterForm = new FormGroup({
    name: new FormControl(''),
  });
  patients: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  
  loadAppointments(): void {
    this.appointmentService.getDoctorAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load appointments.';
      },
    });
  }

  selectAppointment(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    this.errorMessage = '';
    this.successMessage = '';
  }

  respond(status: ApprovalStatus): void {
    if (!this.selectedAppointment) {
      this.errorMessage = 'No appointment selected.';
      return;
    }

    this.appointmentService
      .updateAppointmentStatus(this.selectedAppointment.id, status)
      .subscribe({
        next: () => {
          this.successMessage = `Appointment ${status}`;
          // تحديث حالة الموعد في القائمة المحلية
          this.selectedAppointment!.status = status;
          // يمكن تحديث المصفوفة أيضاً حسب الحاجة
          const index = this.appointments.findIndex(
            (a) => a.id === this.selectedAppointment!.id
          );
          if (index !== -1) {
            this.appointments[index].status = status;
          }
        },
        error: () => {
          this.errorMessage = 'Failed to update appointment status.';
        },
      });
  }
  getAppointmentsForPatient(patientId: string | number): any[] {
    return this.appointments.filter((app) => app.patientId === patientId);
  }

  get filteredPatients(): any[] {
    const nameFilter = this.filterForm.value.name?.toLowerCase() || '';
    return this.patients.filter((p) =>
      p.name.toLowerCase().includes(nameFilter)
    );
  }
}

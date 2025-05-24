import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../core/models/appointment.model';
import { AppointmentService } from '../../../core/services/Appointment/appointment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DoctorDashboardComponent implements OnInit {
  appointments: Appointment[] = [];
  totalAppointments = 0;
  pendingAppointments = 0;
  approvedAppointments = 0;
  rejectedAppointments = 0;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.totalAppointments = data.length;
        this.pendingAppointments = data.filter(
          (a) => a.status === 'pending'
        ).length;
        this.approvedAppointments = data.filter(
          (a) => a.status === 'approved'
        ).length;
        this.rejectedAppointments = data.filter(
          (a) => a.status === 'rejected'
        ).length;
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
      },
    });
  }
}

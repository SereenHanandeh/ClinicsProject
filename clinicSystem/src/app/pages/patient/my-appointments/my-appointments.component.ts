import { Component } from '@angular/core';
import { PatientService } from '../../../core/services/Patient/patient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-appointments',
  imports: [CommonModule],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.scss'
})
export class MyAppointmentsComponent {
 appointments: any[] = [];

  constructor(private patientService: PatientService ) {}

  ngOnInit(): void {
    this.patientService.getAppointments().subscribe(data => {
      this.appointments = data;
    });
  }
}

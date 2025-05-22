import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../core/services/Appointment/appointment.service';
import { ReactiveFormsModule } from '@angular/forms';

import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-list',
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
  }
}

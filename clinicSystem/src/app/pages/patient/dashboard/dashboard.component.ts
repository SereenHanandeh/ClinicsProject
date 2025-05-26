import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../core/models/appointment.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  healthSummary = {
    bloodPressure: '120/80 mmHg',
    weight: '70 kg',
    bloodSugar: '90 mg/dL',
  };

  upcomingAppointments: Appointment[] = [];

  notifications: string[] = [
    'Your appointment with Dr. Smith is confirmed for June 10th.',
    'Time to take your Metformin medication.',
  ];

  constructor() {}

  ngOnInit(): void {
  }
}

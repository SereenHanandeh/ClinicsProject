import { Component, Input } from '@angular/core';
import { Appointment } from '../../../core/models/appointment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-history',
  imports: [CommonModule],
  templateUrl: './patient-history.component.html',
  styleUrl: './patient-history.component.scss'
})
export class PatientHistoryComponent {
  @Input() history: Appointment[] = [];

}

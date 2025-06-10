import { Component, Input } from '@angular/core';
import { Appointment } from '../../../core/models/appointment.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from "../../../shared/pips/translate.pipe";

@Component({
  selector: 'app-patient-history',
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './patient-history.component.html',
  styleUrl: './patient-history.component.scss',
})
export class PatientHistoryComponent {
  @Input() history: Appointment[] = [];
}

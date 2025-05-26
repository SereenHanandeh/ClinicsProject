import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../core/services/Patient/patient.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-appointment',
  imports: [FormsModule],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.scss'
})
export class BookAppointmentComponent {
 doctorId: string = '';
  selectedDate: string = '';
  selectedTime: string = '';


  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService  
  ) {}

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.paramMap.get('doctorId') || '';
  }

  bookAppointment() {
    const appointment = {
      doctorId: this.doctorId,
      date: this.selectedDate,
      time: this.selectedTime
    };

  this.patientService.createAppointment(appointment).subscribe(() => {
      alert('تم حجز الموعد بنجاح!');
    });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '../../../core/models/appointment.model';
import { HttpClient } from '@angular/common/http';
import { TranslatePipe } from "../../../shared/pips/translate.pipe";

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent {
  doctorId: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  currentUser: any = null;

  timeSlots: string[] = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30'
  ];

  bookedTimes: string[] = [];
  minDate: string = '';

  ngOnInit(): void {
  this.doctorId = this.route.snapshot.paramMap.get('doctorId') || '';
  const user = localStorage.getItem('currentUser');
  this.currentUser = user ? JSON.parse(user) : null;

  const today = new Date();
  today.setDate(today.getDate() + 1);  // هنا أضفنا يوم واحد
  this.minDate = today.toISOString().split('T')[0];

  const savedDate = localStorage.getItem('selectedDate');
  if (savedDate) {
    this.selectedDate = savedDate;
    this.loadBookedTimes();
  }
}


  constructor(private route: ActivatedRoute,private httpClient:HttpClient) {}

  onDateChange(): void {
    if (this.selectedDate) {
      localStorage.setItem('selectedDate', this.selectedDate);
      this.loadBookedTimes();
      this.selectedTime = '';
    }
  }

  loadBookedTimes(): void {
  if (!this.selectedDate) {
    this.bookedTimes = [];
    return;
  }

  this.httpClient.get<Appointment[]>('http://localhost:3000/appointments').subscribe({
    next: (allAppointments) => {
      const booked = allAppointments.filter(a =>
        a.doctorId.toString() === this.doctorId &&
        a.date.startsWith(this.selectedDate)
      );
      this.bookedTimes = booked.map(a => a.date.split('T')[1]);
    },
    error: (err) => {
      console.error('Error loading appointments:', err);
      this.bookedTimes = [];
    }
  });
}


  isTimeBooked(time: string): boolean {
    return this.bookedTimes.includes(time);
  }

  selectTime(time: string): void {
    if (!this.isTimeBooked(time)) {
      this.selectedTime = time;
    }
  }

   bookAppointment(): void {
    if (!this.selectedDate || !this.selectedTime) {
      alert('Please select a date and time!');
      return;
    }
    if (!this.currentUser) {
      alert('User not logged in.');
      return;
    }
    if (this.isTimeBooked(this.selectedTime)) {
      alert('This time is already booked. Please choose another.');
      return;
    }

    const fullDateTime = `${this.selectedDate}T${this.selectedTime}`;
    const newAppointment = {
      id: Date.now(),
      doctorId: Number(this.doctorId),
      patientId: this.currentUser.id,
      patientName: this.currentUser.name,
      date: fullDateTime,
      status: 'pending',
      details: {
        drugs: [],
        diagnosis: '',
        payment: 0
      }
    };

    this.httpClient.post('http://localhost:3000/appointments', newAppointment).subscribe({
      next: () => {
        alert('Appointment booked successfully!');
        this.loadBookedTimes();
        this.selectedTime = '';
      },
      error: (err) => {
        console.error('Error booking appointment:', err);
        alert('Failed to book appointment. Please try again later.');
      }
    });
  }

}
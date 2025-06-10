import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment, ApprovalStatus } from '../../models/appointment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getDoctorAppointments(): Observable<Appointment[]> {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      throw new Error('Doctor ID not found in localStorage.');
    }

    const doctorId = JSON.parse(user).id;
    return this.http.get<Appointment[]>(
      `${this.baseUrl}/appointments?doctorId=${doctorId}`
    );
  }

  getAppointmentsByDoctor(doctorId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${this.baseUrl}/appointments?doctorId=${doctorId}`
    );
  }

  updateAppointmentDetails(
    id: number,
    details: Appointment['details']
  ): Observable<Appointment> {
    return this.http.patch<Appointment>(`${this.baseUrl}/appointments/${id}`, {
      details,
    });
  }
  updateAppointmentStatus(
    id: number,
    data: Partial<Appointment>
  ): Observable<Appointment> {
    return this.http.patch<Appointment>(
      `${this.baseUrl}/appointments/${id}`,
      data
    );
  }

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patients`);
  }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointments`);
  }
}

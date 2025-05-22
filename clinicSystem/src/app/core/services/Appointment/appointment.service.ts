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

  getAppointmentsByDoctor(doctorId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${this.baseUrl}/appointments?doctorId=${doctorId}`
    );
  }

  updateAppointmentStatus(
    appointmentId: number,
    status: ApprovalStatus
  ): Observable<Appointment> {
    return this.http.patch<Appointment>(
      `${this.baseUrl}/appointments/${appointmentId}`,
      { status }
    );
  }

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patients`);
  }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointments`);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment, ApprovalStatus } from '../../models/appointment.model';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getDoctorAppointments(): Observable<Appointment[]> {
    const doctorId = 1;
    return this.http.get<Appointment[]>(
      `${this.baseUrl}/appointments?doctorId=${doctorId}&status=pending`
    );
  }

  getAppointmentsByDoctor(doctorId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${this.baseUrl}/appointments?doctorId=${doctorId}`
    );
  }

  updateAppointmentDetails(
    id: number,
    details: { diagnosis: string; drugs: string[]; payment: number }
  ): Observable<any> {
    return this.http.patch<Appointment>(`${this.baseUrl}/appointments/${id}`, {
      details,
    });
  }

  updateAppointmentStatus(
    id: number,
    status: ApprovalStatus,
    details: { diagnosis: string; drugs: string[]; payment: number }
  ): Observable<any> {
    const body = {
      status,
      details,
    };
    return this.http.patch(`${this.baseUrl}/appointments/${id}`, body);
  }

  getAllPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patients`);
  }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointments`);
  }
}

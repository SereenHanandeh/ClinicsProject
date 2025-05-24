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
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments?doctorId=${doctorId}&status=pending`);
  }

  getAppointmentsByDoctor(doctorId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${this.baseUrl}/appointments?doctorId=${doctorId}`
    );
  }

  updateAppointmentDetails(id: number, details: Appointment['details']): Observable<Appointment> {
    return this.http.patch<Appointment>(`${this.baseUrl}/appointments/${id}`, { details });
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

//   updateAppointmentStatusAndDetails(id: number, status: ApprovalStatus, details: any): Observable<Appointment> {
//   return this.http.patch<Appointment>(`${this.baseUrl}/${id}`, {
//     status,
//     details
//   });
// }


  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patients`);
  }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointments`);
  }

}

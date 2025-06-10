import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Patient } from '../../models/patient.model';
import { Doctor } from '../../models/doctor.model';
import { Appointment } from '../../models/appointment.model';
import { Clinic } from '../../models/clinic.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctors`);
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`);
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/patients/${id}`);
  }

  updatePatient(id: string, data: Partial<Patient>): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/patients/${id}`, data);
  }

  createAppointment(data: Partial<Appointment>): Observable<Appointment> {
    const { id, ...appointmentData } = data;
    return this.http.post<Appointment>(
      `${this.baseUrl}/appointments`,
      appointmentData
    );
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/doctors/${id}`);
  }

 bookAppointment(data: Partial<Appointment>): Observable<Appointment> {
  const shortId = new Date().getTime() % 10000; 
  const appointmentData = { ...data, id: shortId };
  
  return this.http.post<Appointment>(`${this.baseUrl}/appointments`, appointmentData);
}

  getMyAppointments(patientId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${this.baseUrl}/appointments?patientId=${patientId}`
    );
  }

  getPatientProfile(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/patients/${id}`);
  }

  updatePatientProfile(
    id: number,
    data: Partial<Patient>
  ): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/patients/${id}`, data);
  }

  getBookedTimes(doctorId: string, date: string): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>(`${this.baseUrl}/appointments`)
      .pipe(
        map((appointments) =>
          appointments.filter(
            (a) => a.doctorId === +doctorId && a.date === date
          )
        )
      );
  }

  getClinics(): Observable<Clinic[]> {
    return this.http.get<Clinic[]>(`${this.baseUrl}/clinics`);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/appointments/${id}`);
  }
}

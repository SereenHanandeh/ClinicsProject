import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { User } from '../../models/user.model';
import { Patient } from '../../models/patient.model';
import { Doctor } from '../../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseUrl = 'http://localhost:3000'; // غيّريه حسب الباك اند

  constructor(private http: HttpClient) {}
  getDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/doctors`);
  }

  getAppointments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/appointments`);
  }

  getPatientById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/patients/${id}`);
  }

  updatePatient(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/patients/${id}`, data);
  }

  createAppointment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/appointments`, data);
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/doctors/${id}`);
  }

  bookAppointment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/appointments`, data);
  }

  getMyAppointments(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/appointments?patientId=${patientId}`
    );
  }

  getPatientProfile(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/patients/${id}`);
  }

  updatePatientProfile(id: number, data: Partial<Patient>): Observable<any> {
    return this.http.put(`${this.baseUrl}/patients/${id}`, data);
  }

}

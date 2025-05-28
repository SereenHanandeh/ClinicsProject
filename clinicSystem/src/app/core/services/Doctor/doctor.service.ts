import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private baseUrl = 'http://localhost:3000/doctors';

  constructor(private http: HttpClient) {}

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/${id}`);
  }

  updateDoctor(id: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.baseUrl}/${id}`, doctor);
  }
  
  getDoctors() {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  addDoctor(doctor: any) {
    return this.http.post(`${this.baseUrl}`, doctor);
  }

  deleteDoctor(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

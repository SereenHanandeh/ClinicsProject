import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private baseUrl = 'http://localhost:3000/doctors';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.baseUrl);
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/${id}`);
  }

  updateDoctor(id: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.baseUrl}/${id}`, doctor);
  }



  addDoctor(doctor: any) {
    const { id, ...payload } = doctor;

    return this.http.post(`${this.baseUrl}`, doctor);
  }

  deleteDoctor(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clinic } from '../../models/clinic.model';

@Injectable({
  providedIn: 'root',
})
export class ClinicService {
  private baseUrl = 'http://localhost:3000/clinics';

  constructor(private http: HttpClient) {}

  // جلب جميع العيادات
  getClinics(): Observable<Clinic[]> {
    return this.http.get<Clinic[]>(this.baseUrl);
  }

  // جلب عيادة واحدة
  getClinicById(id: number): Observable<Clinic> {
    return this.http.get<Clinic>(`${this.baseUrl}/${id}`);
  }

  // إضافة عيادة جديدة
  addClinic(clinic: Omit<Clinic, 'id'>): Observable<Clinic> {
    return this.http.post<Clinic>(this.baseUrl, clinic);
  }

  // تعديل عيادة
  updateClinic(id: number, clinic: Partial<Clinic>): Observable<Clinic> {
    return this.http.put<Clinic>(`${this.baseUrl}/${id}`, clinic);
  }

  // حذف عيادة
  deleteClinic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

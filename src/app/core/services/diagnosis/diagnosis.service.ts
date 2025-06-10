import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diagnosis } from '../../models/diagnosis.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiagnosisService {
  private baseUrl = 'http://localhost:3000/diagnoses';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Diagnosis[]> {
    return this.http.get<Diagnosis[]>(this.baseUrl);
  }

  add(diagnosis: Diagnosis): Observable<Diagnosis> {
     const { id, ...payload } = diagnosis;
    return this.http.post<Diagnosis>(this.baseUrl, diagnosis);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Diagnosis): Observable<Diagnosis> {
    return this.http.put<Diagnosis>(`${this.baseUrl}/${id}`, data);
  }
}


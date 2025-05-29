import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Drug } from '../../models/durg.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrugService {
  private baseUrl = 'http://localhost:3000/drugs';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Drug[]> {
    return this.http.get<Drug[]>(this.baseUrl);
  }

  add(drug: Drug): Observable<Drug> {
    const { id, ...payload } = drug;
    return this.http.post<Drug>(this.baseUrl, drug);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Drug): Observable<Drug> {
    return this.http.put<Drug>(`${this.baseUrl}/${id}`, data);
  }
}

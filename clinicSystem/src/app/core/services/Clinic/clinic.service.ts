import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

 private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}
   getClinics() {
    return this.http.get<any[]>(`${this.baseUrl}/clinics`);
  }
}

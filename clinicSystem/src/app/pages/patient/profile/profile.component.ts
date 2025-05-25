import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../../core/services/Patient/patient.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [FormsModule,CommonModule,ReactiveFormsModule ,RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
 profileForm!: FormGroup;
  patientId: string = '7907'; 

  constructor(private fb: FormBuilder, private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatientById(this.patientId).subscribe(data => {
      this.profileForm = this.fb.group({
        name: [data.name],
        email: [data.email],
        phone: [data.phone],
        gender: [data.gender],
        dateOfBirth: [data.dateOfBirth]
      });
    });
  }

  updateProfile() {
    this.patientService.updatePatient(this.patientId, this.profileForm.value).subscribe(() => {
      alert('تم تحديث الملف الشخصي بنجاح!');
    });
  }
}

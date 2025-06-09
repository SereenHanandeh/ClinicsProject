import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PatientService } from '../../../core/services/Patient/patient.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { TranslatePipe } from "../../../shared/pips/translate.pipe";

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslatePipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  patientId!: number | null;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  this.patientId = this.authService.getCurrentUserId();

    if (!this.patientId) {
      alert('User not logged in.');
      return;
    }

    this.patientService
      .getPatientById(this.patientId.toString())
      .subscribe((data) => {
        this.profileForm = this.fb.group({
          name: [data.name, Validators.required],
          email: [data.email, [Validators.required, Validators.email]],
          phone: [data.phone, Validators.required],
          gender: [data.gender, Validators.required],
          dateOfBirth: [data.dateOfBirth, Validators.required],
        });
      });
  }

  updateProfile() {
    if (!this.patientId) return;

    if (this.profileForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }

    this.patientService
      .updatePatient(this.patientId.toString(), this.profileForm.value)
      .subscribe(
        () => {
          alert('Profile updated successfully!');
        },
        (error) => {
          alert(
            'An error occurred while updating the profile. Please try again.'
          );
          console.error(error);
        }
      );
  }
}

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
import { TranslatePipe } from '../../../shared/pips/translate.pipe';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { I18nService } from '../../../core/services/i18n/i18n.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslatePipe,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  patientId!: number | null;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private authService: AuthService,
    private messageService: MessageService,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.patientId = this.authService.getCurrentUserId();

    if (!this.patientId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User not logged in.',
      });
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
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please fill out the form correctly.',
      });
      return;
    }

    this.patientService
      .updatePatient(this.patientId.toString(), this.profileForm.value)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Profile updated successfully!',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Update Failed',
            detail: 'An error occurred while updating the profile.',
          });
          console.error(error);
        }
      );
  }
}

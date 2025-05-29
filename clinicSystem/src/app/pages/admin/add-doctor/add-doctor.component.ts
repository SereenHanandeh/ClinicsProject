import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DoctorService } from '../../../core/services/Doctor/doctor.service';
import { ClinicService } from '../../../core/services/Clinic/clinic.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-doctor',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.scss',
})
export class AddDoctorComponent {
  doctorForm!: FormGroup;
  clinics: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private clinicService: ClinicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      specification: ['', [Validators.required, Validators.minLength(3)]],
      clinicId: ['', Validators.required],
      image: [''],
    });

    this.loadClinics();
  }

get f(): { [key: string]: AbstractControl } {
  return this.doctorForm.controls;
}


  loadClinics() {
    this.clinicService.getClinics().subscribe({
      next: (data) => (this.clinics = data),
      error: () => (this.errorMessage = 'فشل في جلب قائمة العيادات'),
    });
  }

  onSubmit() {
    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.doctorService.addDoctor(this.doctorForm.value).subscribe({
      next: () => {
        this.loading = false;
        alert('تم إضافة الطبيب بنجاح');
        this.router.navigate(['/admin/manageDoctors/:id']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'فشل في إضافة الطبيب';
      },
    });
  }
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DoctorService } from '../../../core/services/Doctor/doctor.service';
import { CommonModule } from '@angular/common';
import { ClinicService } from '../../../core/services/Clinic/clinic.service';
import { TranslatePipe } from "../../../shared/pips/translate.pipe";

@Component({
  selector: 'app-edit-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.scss',
})
export class EditDoctorComponent {
  doctorForm: FormGroup;
  loading = false;
  errorMessage = '';
  doctorId!: number;

  clinics: any[] = [];

  showSuccessModal = false;
  progressBarWidth = 100;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private clinicService: ClinicService,
    private fb: FormBuilder
  ) {
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      specification: ['', [Validators.required, Validators.minLength(3)]],
      clinicId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.doctorId = +this.route.snapshot.paramMap.get('id')!;
    this.loadClinics();
    this.loadDoctorData();
  }

  loadClinics() {
    this.clinicService.getClinics().subscribe({
      next: (data) => (this.clinics = data),
      error: () => (this.errorMessage = 'Failed to load clinics list'),
    });
  }

  loadDoctorData() {
    this.loading = true;
    this.doctorService.getDoctorById(this.doctorId).subscribe({
      next: (doctor) => {
        this.doctorForm.patchValue({
          name: doctor.name,
          email: doctor.email,
          phone: doctor.phone,
          specification: doctor.specification,
          clinicId: doctor.clinicId,
        });
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load doctor data';
        this.loading = false;
      },
    });
  }

  get f() {
    return this.doctorForm.controls;
  }

  onSubmit() {
    if (this.doctorForm.invalid) {
      return;
    }

    this.loading = true;
    this.doctorService
      .updateDoctor(this.doctorId, this.doctorForm.value)
      .subscribe({
        next: () => {
          this.loading = false;

          // Show success modal
          this.showSuccessModal = true;
          this.progressBarWidth = 100;

          const interval = setInterval(() => {
            this.progressBarWidth -= 2;
            if (this.progressBarWidth <= 0) {
              clearInterval(interval);
              this.showSuccessModal = false;
              this.router.navigate(['/admin/manageDoctor']);
            }
          }, 60);
        },
        error: () => {
          this.errorMessage = 'An error occurred while updating doctor data';
          this.loading = false;
        },
      });
  }
}

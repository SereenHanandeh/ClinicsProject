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
import { TranslatePipe } from '../../../shared/pips/translate.pipe';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.scss',
})
export class AddDoctorComponent {
  doctorForm!: FormGroup;
  clinics: any[] = [];
  loading = false;
  errorMessage = '';
  doctors: any[] = [];
  showSuccessModal = false;
  progressValue = 100;

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

    const email = this.doctorForm.value.email;
    const emailExists = this.doctors.some((doc) => doc.email === email);

    if (emailExists) {
      this.errorMessage = 'Email is already in use';
      this.loading = false;
      return;
    }

    this.loading = true;

    const maxId =
      this.doctors.length > 0 ? Math.max(...this.doctors.map((d) => d.id)) : 16;

    const newDoctor = {
      id: maxId + 1,
      ...this.doctorForm.value,
    };

    this.doctorService.addDoctor(newDoctor).subscribe({
      next: () => {
        this.loading = false;
        this.errorMessage = '';
        this.showSuccessModal = true;
        this.progressValue = 100; 

        const interval = setInterval(() => {
          this.progressValue -= 2; 
          if (this.progressValue <= 0) {
            clearInterval(interval);
            this.showSuccessModal = false;
            this.router.navigate(['/admin/manageDoctor']);
          }
        }, 60);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = ' Falid to add new doctor';
      },
    });
  }
}

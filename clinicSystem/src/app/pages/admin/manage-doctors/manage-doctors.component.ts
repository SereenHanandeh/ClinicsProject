import { Component } from '@angular/core';
import { Doctor } from '../../../core/models/doctor.model';
import { DoctorService } from '../../../core/services/Doctor/doctor.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-doctors',
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './manage-doctors.component.html',
  styleUrl: './manage-doctors.component.scss',
})
export class ManageDoctorsComponent {
  doctorForm!: FormGroup;
  doctorId!: number;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // الحصول على id من رابط الصفحة
    this.doctorId = Number(this.route.snapshot.paramMap.get('id'));

    // إنشاء الفورم مع Validators
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      specification: ['', Validators.required],
      clinicId: ['', Validators.required],
      image: [''],
    });

    // جلب بيانات الدكتور للعرض في الفورم
    this.loadDoctor();
  }

  loadDoctor() {
    this.loading = true;
    this.doctorService.getDoctorById(this.doctorId).subscribe({
      next: (doctor) => {
        this.doctorForm.patchValue(doctor);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'حدث خطأ أثناء تحميل بيانات الدكتور';
        this.loading = false;
      },
    });
  }

  onSubmit() {
    if (this.doctorForm.invalid) {
      return;
    }

    const updatedDoctor: Doctor = {
      id: this.doctorId,
      ...this.doctorForm.value,
      clinicId: Number(this.doctorForm.value.clinicId),
    };

    this.loading = true;
    this.doctorService.updateDoctor(this.doctorId, updatedDoctor).subscribe({
      next: () => {
        this.loading = false;
        alert('تم تحديث بيانات الدكتور بنجاح');
        this.router.navigate(['/manage-doctors']);
      },
      error: () => {
        this.errorMessage = 'فشل تحديث بيانات الدكتور';
        this.loading = false;
      },
    });
  }
}

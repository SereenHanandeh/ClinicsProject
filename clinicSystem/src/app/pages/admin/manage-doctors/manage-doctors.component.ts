import { Component } from '@angular/core';
import { Doctor } from '../../../core/models/doctor.model';
import { DoctorService } from '../../../core/services/Doctor/doctor.service';
import {  Router, RouterModule } from '@angular/router';
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
   doctors: Doctor[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllDoctors();
  }

  loadAllDoctors() {
    this.loading = true;
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'فشل في جلب بيانات الأطباء';
        this.loading = false;
      },
    });
  }

  editDoctor(id: number) {
    this.router.navigate(['/admin/editDoctor', id]);
  }

  deleteDoctor(id: number) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا الطبيب؟')) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: () => {
          alert('تم حذف الطبيب بنجاح');
          this.loadAllDoctors(); // إعادة تحميل القائمة بعد الحذف
        },
        error: () => {
          alert('حدث خطأ أثناء حذف الطبيب');
        },
      });
    }
  }

  goToAddDoctor() {
  this.router.navigate(['/admin/addDoctor']);
}

}

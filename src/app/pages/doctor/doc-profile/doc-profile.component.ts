import { Component } from '@angular/core';
import { Doctor } from '../../../core/models/doctor.model';
import { DoctorService } from '../../../core/services/Doctor/doctor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../shared/pips/translate.pipe';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { I18nService } from '../../../core/services/i18n/i18n.service';

@Component({
  selector: 'app-doc-profile',
  imports: [FormsModule, CommonModule, TranslatePipe, ToastModule],
  providers: [MessageService],

  templateUrl: './doc-profile.component.html',
  styleUrl: './doc-profile.component.scss',
})
export class DocProfileComponent {
  doctor: Doctor | null = null;

  constructor(
    private doctorService: DoctorService,
    private messageService: MessageService,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    const doctorId = localStorage.getItem('doctorId');
    if (doctorId) {
      this.doctorService.getDoctorById(+doctorId).subscribe({
        next: (data) => (this.doctor = data),
        error: (err) => console.error('Error loading doctor data', err),
      });
    } else {
      console.error('No doctor ID found in localStorage');
    }
  }

  onSubmit() {
    if (!this.doctor) return;
    this.doctorService
      .updateDoctor(this.doctor.id, this.doctor)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'profile_updated_successfully',
        });
      });
  }
}

import { Component } from '@angular/core';
import { ClinicService } from '../../../core/services/Clinic/clinic.service';
import { Clinic } from '../../../core/models/clinic.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../../shared/pips/translate.pipe';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-manage-clinics',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslatePipe,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './manage-clinics.component.html',
  styleUrl: './manage-clinics.component.scss',
})
export class ManageClinicsComponent {
  clinics: Clinic[] = [];

  newClinic: Omit<Clinic, 'id'> = {
    name: '',
    image: '',
  };

  constructor(
    private clinicService: ClinicService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadClinics();
  }

  loadClinics() {
    this.clinicService.getClinics().subscribe((data) => (this.clinics = data));
  }

  addClinic() {
    if (!this.newClinic.name || !this.newClinic.image) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill in all fields',
      });
      return;
    }

    this.clinicService.addClinic(this.newClinic).subscribe({
      next: () => {
        this.newClinic = { name: '', image: '' };
        this.loadClinics();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Clinic added successfully',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add clinic',
        });
      },
    });
  }

  deleteClinic(id: number) {
    this.messageService.add({
      key: 'confirm',
      severity: 'warn',
      summary: 'Are you sure?',
      detail: 'Confirm to delete this clinic',
      sticky: true,
      data: { id },
    });
  }

  onConfirmDelete(id: number) {
    this.clinicService.deleteClinic(id).subscribe({
      next: () => {
        this.loadClinics();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Clinic deleted successfully',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete clinic',
        });
      },
    });
  }

  onRejectDelete() {
    this.messageService.clear('confirm');
  }
}

import { Component } from '@angular/core';
import { ClinicService } from '../../../core/services/Clinic/clinic.service';
import { Clinic } from '../../../core/models/clinic.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-clinics',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './manage-clinics.component.html',
  styleUrl: './manage-clinics.component.scss'
})
export class ManageClinicsComponent {
  clinics: Clinic[] = [];

  newClinic: Omit<Clinic, 'id'> = {
    name: '',
    image: ''
  };

  constructor(private clinicService: ClinicService) {}

  ngOnInit(): void {
    this.loadClinics();
  }

  loadClinics() {
    this.clinicService.getClinics().subscribe(data => this.clinics = data);
  }

  addClinic() {
    if (!this.newClinic.name  || !this.newClinic.image) {
      alert('Please fill in all fields');
      return;
    }

    this.clinicService.addClinic(this.newClinic).subscribe(() => {
      this.newClinic = { name: '', image: '' };
      this.loadClinics();
    });
  }

  deleteClinic(id: number) {
    if (confirm('Are you sure you want to delete this clinic?')) {
      this.clinicService.deleteClinic(id).subscribe(() => this.loadClinics());
    }
  }
}

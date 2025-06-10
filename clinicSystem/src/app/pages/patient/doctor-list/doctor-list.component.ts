import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../core/services/Patient/patient.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClinicService } from '../../../core/services/Clinic/clinic.service';
import { TranslatePipe } from '../../../shared/pips/translate.pipe';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
})
export class DoctorListComponent implements OnInit {
  clinics: any[] = [];
  doctors: any[] = [];
  filteredDoctors: any[] = [];

  constructor(
    private patientService: PatientService,
    private clinicService: ClinicService
  ) {}


  ngOnInit(): void {
    this.clinicService.getClinics().subscribe((clinicsData) => {
      this.clinics = clinicsData;
    });

    this.patientService.getDoctors().subscribe((doctorsData) => {
      this.doctors = doctorsData;
    });
  }

  filterDoctorsByClinic(clinicId: string): void {
    this.filteredDoctors = this.doctors.filter(
      (doctor) => doctor.clinicId.toString() === clinicId
    );
  }
}

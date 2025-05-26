
import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { PatientService } from '../../../core/services/Patient/patient.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClinicService } from '../../../core/services/Clinic/clinic.service';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
})
export class DoctorListComponent implements OnInit {
  clinics: any[] = [];
  doctors: any[] = [];
  filteredDoctors: any[] = [];

  constructor(private patientService: PatientService,private clinicService: ClinicService) {}

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
=======

@Component({
  selector: 'app-doctor-list',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss',
})
export class DoctorListComponent {
  doctors: any[] = [];
  filteredDoctors: any[] = [];
  selectedSpecialty: string = '';
  selectedClinic: string = '';

  constructor(private paitentService: PatientService) {}

  ngOnInit(): void {
    this.paitentService.getDoctors().subscribe((data) => {
      this.doctors = data;
      this.filteredDoctors = data;
    });
  }

  applyFilters() {
    this.filteredDoctors = this.doctors.filter((doc) => {
      return (
        (!this.selectedSpecialty ||
          doc.specification === this.selectedSpecialty) &&
        (!this.selectedClinic ||
          doc.clinicId.toString() === this.selectedClinic)
      );
    });
  }
}

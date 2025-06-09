import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../../core/models/doctor.model';
import { DoctorService } from '../../../core/services/Doctor/doctor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doc-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './doc-profile.component.html',
  styleUrls: ['./doc-profile.component.scss']
})
export class DocProfileComponent implements OnInit {
  doctor: Doctor | null = null;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
      alert('Doctor not logged in.');
      return;
    }
    const currentUser = JSON.parse(currentUserStr);

    if (currentUser && currentUser.userType === 'doctor') {
      const doctorId = currentUser.id;
      this.doctorService.getDoctorById(doctorId).subscribe({
        next: (data) => {
          this.doctor = data;
        },
        error: (err) => {
          console.error('Error loading doctor data', err);
          alert('Error loading doctor data.');
        }
      });
    } else {
      alert('Current user is not a doctor.');
    }
  }

  onSubmit() {
    if (!this.doctor) return;

    this.doctorService.updateDoctor(this.doctor.id, this.doctor).subscribe({
      next: () => alert('Profile updated successfully!'),
      error: (err) => {
        console.error('Error updating profile', err);
        alert('Failed to update profile.');
      }
    });
  }
}

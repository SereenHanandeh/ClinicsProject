import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pips/translate.pipe';
import { I18nService } from '../../core/services/i18n/i18n.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',


  standalone: true,
  imports: [TranslatePipe, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  currentYear: number = new Date().getFullYear();
  mobileMenu: boolean = false;

  services = [
    {
      icon: '🩺',
      title: 'Medical Records',
      desc: 'Secure and easy access to patient medical records.',
    },
    {
      icon: '📅',
      title: 'Appointments',
      desc: 'Book and manage your medical appointments easily.',
    },
    {
      icon: '💊',
      title: 'Prescriptions',
      desc: 'Digital prescriptions available instantly.',
    },
  ];

  departments = [
    {
      name: 'Cardiology',
      desc: 'Heart related treatments and diagnostics.',
      img: 'assets/img/departments/cardiology.jpg',
    },
    {
      name: 'Neurology',
      desc: 'Brain and nervous system specialists.',
      img: 'assets/img/departments/neurology.jpg',
    },
  ];

  activeDep = 0;

  doctors = [
    {
      name: 'Dr. Sarah Ahmed',
      position: 'Cardiologist',
      img: 'assets/img/doctors/sarah.jpg',
      instagram: 'https://instagram.com/dr.sarah',
      linkedin: 'https://linkedin.com/in/drsarah',
    },
    {
      name: 'Dr. Omar Saleh',
      position: 'Neurologist',
      img: 'assets/img/doctors/omar.jpg',
      instagram: 'https://instagram.com/dr.omar',
      linkedin: 'https://linkedin.com/in/dromar',
    },
  ];
  currentLang: 'en' | 'ar' = 'en';

  constructor(private i18n: I18nService) {
    this.currentLang = this.i18n.getLanguage();
  }

  switchLang(lang: 'en' | 'ar') {
    console.log(lang);
    this.i18n.loadTranslations(lang);
    this.i18n.getLanguage();
    this.currentLang = lang;
  }
}

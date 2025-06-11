import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pips/translate.pipe';
import { I18nService } from '../../core/services/i18n/i18n.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',

  standalone: true,
  imports: [RouterModule, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  currentYear: number = new Date().getFullYear();

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

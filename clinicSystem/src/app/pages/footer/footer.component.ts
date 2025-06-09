import { Component } from '@angular/core';
import { I18nService } from '../../core/services/i18n/i18n.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(public i18nService: I18nService) {}

  switchLanguage(lang: 'en' | 'ar') {
    this.i18nService.setLanguage(lang);
    this.i18nService.loadTranslations(lang);
    localStorage.setItem('lang', lang);
  }
}

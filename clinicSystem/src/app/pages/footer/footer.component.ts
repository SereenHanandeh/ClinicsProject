import { Component } from '@angular/core';
import { I18nService } from '../../core/services/i18n/i18n.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentLang: 'en' | 'ar' = 'en';

  constructor(private i18n: I18nService) {
    this.currentLang = this.i18n.getLanguage();
  }

  switchLang(lang: 'en' | 'ar') {
    console.log(lang);
    this.i18n.loadTranslations(lang);
    this.i18n.setLanguage(lang);
    this.currentLang = lang;
  }
}

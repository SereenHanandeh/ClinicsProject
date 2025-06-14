import { Component } from '@angular/core';
import { I18nService } from '../../core/services/i18n/i18n.service';
import { TranslatePipe } from '../../shared/pips/translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  lang: 'en' | 'ar' = 'en';

  constructor(private i18nService: I18nService) {}

  changeLanguage(lang: 'en' | 'ar') {
    this.i18nService.loadTranslations(lang);
    this.lang = lang;
  }
}

import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pips/translate.pipe';
import { I18nService } from '../../core/services/i18n/i18n.service';
import { RouterModule } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-home',

  standalone: true,
  imports: [RouterModule, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  loading = false;
  success = false;
  error = false;

  sendEmail(form: any) {
    this.loading = true;
    this.success = false;
    this.error = false;

    emailjs.sendForm(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      form.form.value, 
      'YOUR_USER_ID' 
    ).then(() => {
      this.loading = false;
      this.success = true;
      form.reset();
    }, () => {
      this.loading = false;
      this.error = true;
    });
  }
  currentLang: 'en' | 'ar' = 'en';

  constructor(private i18nService: I18nService) {}

  switchLang(lang: 'en' | 'ar') {
    console.log(lang);
    this.i18nService.loadTranslations(lang);
    this.i18nService.getLanguage();
    this.currentLang = lang;
  }
}

import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './core/services/i18n/i18n.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from "./pages/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
constructor(
    private i18nService: I18nService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit() {
    let lang: 'en' | 'ar' = 'en';

    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang') as 'en' | 'ar';
      if (savedLang) {
        lang = savedLang;
      }
    }

    this.i18nService.setLanguage(lang);
    await this.i18nService.loadTranslations(lang);
  }
}

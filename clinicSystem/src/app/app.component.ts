import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './core/services/i18n/i18n.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './pages/footer/footer.component';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Clinic-Management-System';
  lang: 'en' | 'ar' = 'en';
  constructor(private titleService: Title, private i18nService: I18nService) {}


  async ngOnInit() {
    await this.getLang();
  }

  test: any = false;
  async getLang() {
    this.lang = (localStorage.getItem('lang') as 'en' | 'ar') || 'en';
    await this.i18nService.loadTranslations(this.lang);
  }
}


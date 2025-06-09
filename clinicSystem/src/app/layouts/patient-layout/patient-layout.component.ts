import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../shared/pips/translate.pipe';
import { FooterComponent } from '../../pages/footer/footer.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

@Component({
  selector: 'app-patient-layout',
  imports: [RouterModule, TranslatePipe, FooterComponent, TranslateModule],
  templateUrl: './patient-layout.component.html',
  styleUrl: './patient-layout.component.scss',
})
export class PatientLayoutComponent {
  private translate = inject(TranslateService);

  switchLanguage(lang: string) {
    this.translate.use(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}

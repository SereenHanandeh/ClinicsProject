import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../shared/pips/translate.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from "../../pages/footer/footer.component";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterModule, TranslatePipe, FooterComponent,TranslateModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  private translate = inject(TranslateService);

  switchLanguage(lang: string) {
    this.translate.use(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}

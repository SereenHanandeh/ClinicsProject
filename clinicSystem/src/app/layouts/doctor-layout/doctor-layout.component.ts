import { Component, inject } from '@angular/core';


import { RouterModule } from '@angular/router';
import { TranslatePipe } from "../../shared/pips/translate.pipe";
import { FooterComponent } from "../../pages/footer/footer.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-doctor-layout',
  imports: [RouterModule, TranslatePipe, FooterComponent,TranslateModule],
  templateUrl: './doctor-layout.component.html',
  styleUrl: './doctor-layout.component.scss',
})
export class DoctorLayoutComponent {
    private translate = inject(TranslateService);

     switchLanguage(lang: string) {
    this.translate.use(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

}

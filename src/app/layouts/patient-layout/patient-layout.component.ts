import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../shared/pips/translate.pipe';
import { FooterComponent } from '../../pages/footer/footer.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { I18nService } from '../../core/services/i18n/i18n.service';

@Component({
  selector: 'app-patient-layout',
  imports: [RouterModule, TranslatePipe, RouterModule, TranslatePipe],
  providers: [MessageService],

  templateUrl: './patient-layout.component.html',
  styleUrl: './patient-layout.component.scss',
})
export class PatientLayoutComponent {
  constructor(
    private messageService: MessageService,
    private i18nService: I18nService
  ) {}
}

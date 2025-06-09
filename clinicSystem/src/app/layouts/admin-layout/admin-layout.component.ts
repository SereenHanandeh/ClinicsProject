import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../shared/pips/translate.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from "../../pages/footer/footer.component";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterModule, TranslatePipe, FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {

  
}

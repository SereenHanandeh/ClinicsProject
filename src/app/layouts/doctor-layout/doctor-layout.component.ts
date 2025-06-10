import { Component, inject } from '@angular/core';


import { RouterModule } from '@angular/router';
import { TranslatePipe } from "../../shared/pips/translate.pipe";
import { FooterComponent } from "../../pages/footer/footer.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-doctor-layout',
  imports: [RouterModule, TranslatePipe, FooterComponent],
  templateUrl: './doctor-layout.component.html',
  styleUrl: './doctor-layout.component.scss',
})
export class DoctorLayoutComponent {
    

}

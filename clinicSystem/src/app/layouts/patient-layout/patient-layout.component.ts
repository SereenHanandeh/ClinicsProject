import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from "../../shared/pips/translate.pipe";

@Component({
  selector: 'app-patient-layout',
  imports: [RouterModule, TranslatePipe],
  templateUrl: './patient-layout.component.html',
  styleUrl: './patient-layout.component.scss'
})
export class PatientLayoutComponent {

}

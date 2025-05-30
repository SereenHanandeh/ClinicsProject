import { Component } from '@angular/core';


import { RouterModule } from '@angular/router';
import { TranslatePipe } from "../../shared/pips/translate.pipe";

@Component({
  selector: 'app-doctor-layout',
  imports: [RouterModule, TranslatePipe],
  templateUrl: './doctor-layout.component.html',
  styleUrl: './doctor-layout.component.scss',
})
export class DoctorLayoutComponent {}

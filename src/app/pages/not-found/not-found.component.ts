import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from "../../shared/pips/translate.pipe";

@Component({
  selector: 'app-not-found',
  imports: [RouterModule, TranslatePipe],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}

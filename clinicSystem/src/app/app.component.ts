import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppointmentsComponent } from "./pages/doctor/appointments/appointments.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppointmentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}

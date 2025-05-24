import { Component } from '@angular/core';
import { AppointmentsComponent } from "../../pages/doctor/appointments/appointments.component";


@Component({
  selector: 'app-doctor-layout',
  imports: [AppointmentsComponent],

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-layout',
  imports: [AppointmentsComponent,RouterModule],
  templateUrl: './doctor-layout.component.html',
  styleUrl: './doctor-layout.component.scss'
})
export class DoctorLayoutComponent {

}

import { Component } from '@angular/core';
import { AppointmentsComponent } from "../../pages/doctor/appointments/appointments.component";

@Component({
  selector: 'app-doctor-layout',
  imports: [AppointmentsComponent],
  templateUrl: './doctor-layout.component.html',
  styleUrl: './doctor-layout.component.scss'
})
export class DoctorLayoutComponent {

}

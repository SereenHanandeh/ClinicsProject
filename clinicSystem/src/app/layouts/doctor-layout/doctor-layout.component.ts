import { Component } from '@angular/core';
import { AppointmentsComponent } from "../../pages/doctor/appointments/appointments.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-layout',
  imports: [RouterModule],
  templateUrl: './doctor-layout.component.html',
  styleUrl: './doctor-layout.component.scss'
})
export class DoctorLayoutComponent {

}

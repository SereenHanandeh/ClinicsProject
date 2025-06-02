import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcom',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './welcom.component.html',
  styleUrls: ['./welcom.component.scss']
})
export class WelcomComponent {
  constructor(private router: Router) {}

  goToUserPage(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.userType === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if (user.userType === 'doctor') {
      this.router.navigate(['/doctor']);
    } else {
      this.router.navigate(['/patient/dashboard']);
    }
  }
}

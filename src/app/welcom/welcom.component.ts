import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from "../shared/pips/translate.pipe";

interface User {
  userType?: 'admin' | 'doctor' | 'patient';
  [key: string]: any; // لتفادي الأخطاء إن وُجدت خصائص أخرى
}

@Component({
  selector: 'app-welcom',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './welcom.component.html',
  styleUrls: ['./welcom.component.scss']
})
export class WelcomComponent implements OnInit {

  user: User = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : {};
  }

  goToUserPage(): void {
    switch (this.user.userType) {
      case 'admin':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'doctor':
        this.router.navigate(['/doctor']);
        break;
      case 'patient':
        this.router.navigate(['/patient/dashboard']);
        break;
      default:
        console.warn('نوع المستخدم غير معروف، سيتم توجيهك إلى الصفحة الرئيسية.');
        this.router.navigate(['/']);
        break;
    }
  }
}

import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '../../shared/pips/translate.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from '../../pages/footer/footer.component';
import { AuthService } from '../../core/services/Auth/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterModule, TranslatePipe, FooterComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  logout() {
    this.authService.logout();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'You have been logged out successfully',
    });
    this.router.navigate(['/']);
  }
}

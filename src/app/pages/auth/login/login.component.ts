import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { TranslatePipe } from '../../../shared/pips/translate.pipe';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { I18nService } from '../../../core/services/i18n/i18n.service';
import { filter, take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslatePipe,
    ToastModule,
  ],
  providers: [MessageService],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  currentLang: 'en' | 'ar' = 'en';
  logoPath = 'assets/logo.png';
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private i18nService: I18nService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (user) => {
        const loginKey = `hasLoggedInBefore_${email}`;
        const isFirstLogin = !localStorage.getItem(loginKey);

        localStorage.setItem('user', JSON.stringify(user));

        if (isFirstLogin) {
          localStorage.setItem(loginKey, 'true');
          this.router.navigate(['/welcome-page']).then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Welcome',
              detail: 'First time login successful!',
            });
          });
        } else {
          this.redirectUser(user.userType);
          this.router.events
            .pipe(
              filter((event) => event instanceof NavigationEnd),
              take(1)
            )
            .subscribe(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Login Successful',
                detail: `Welcome back, ${user.name || 'User'}!`,
              });
            });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Invalid email or password',
        });
      },
    });
  }

  redirectUser(userType: string) {
    if (userType === 'admin') {
      this.router.navigate(['/admin/home']);
    } else if (userType === 'doctor') {
      this.router.navigate(['/doctor/dashboard']);
    } else {
      this.router.navigate(['/patient/dashboard']);
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  switchLang(lang: 'en' | 'ar') {
    console.log(lang);
    this.i18nService.loadTranslations(lang);
    this.i18nService.getLanguage();
    this.currentLang = lang;
  }
}

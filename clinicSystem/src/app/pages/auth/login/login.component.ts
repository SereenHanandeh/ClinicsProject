import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '../../../shared/pips/translate.pipe';
import { FooterComponent } from '../../footer/footer.component';
import { I18nService } from '../../../core/services/i18n/i18n.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslatePipe,
    FooterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  currentLang: 'en' | 'ar' = 'en';

  logoPath = 'assets/logo.png';
  loginForm: FormGroup;
  errorMessage: string = '';
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private i18n: I18nService
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
        // console.log('Login successful:', user);
        const loginKey = `hasLoggedInBefore_${email}`;
        const isFirstLogin = !localStorage.getItem(loginKey);

        localStorage.setItem('user', JSON.stringify(user));

        if (isFirstLogin) {
          localStorage.setItem(loginKey, 'true');
          this.router.navigate(['/welcome-page']).then(() => {
            // console.log('Navigated to welcome-page');
          });
        } else {
          this.redirectUser(user.userType);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
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
    this.i18n.loadTranslations(lang);
    this.i18n.setLanguage(lang);
    this.currentLang = lang;
  }
}

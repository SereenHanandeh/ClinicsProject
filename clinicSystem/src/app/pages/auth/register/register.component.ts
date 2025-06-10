import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
 
import { TranslatePipe } from '../../../shared/pips/translate.pipe';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { I18nService } from '../../../core/services/i18n/i18n.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslatePipe,
    ToastModule,
  ],
  providers: [MessageService],

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  logoPath = 'assets/logo.png';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private i18nService: I18nService
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [Validators.required, Validators.pattern(/^\d{3} ?\d{3} ?\d{4}$/)],
        ],
        gender: ['male', [Validators.required]],
        dateOfBirth: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        userType: ['patient'],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onPhoneInput(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 10) input = input.slice(0, 10);
    let formatted = input;
    if (input.length > 3) {
      formatted = input.slice(0, 3) + ' ';
      if (input.length > 6) {
        formatted += input.slice(3, 6) + ' ' + input.slice(6);
      } else {
        formatted += input.slice(3);
      }
    }
    this.registerForm.get('phone')?.setValue(formatted, { emitEvent: false });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all fields correctly.',
      });
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration successful!',
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Registration Failed',
          detail: error.message || 'Failed to register. Please try again.',
        });
      },
    });
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }
}

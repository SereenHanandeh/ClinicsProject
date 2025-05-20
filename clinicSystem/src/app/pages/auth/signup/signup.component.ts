import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports:[FormsModule],
  standalone:true
})
export class SignupComponent {
  user = { username: '', password: '' };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.user);
    alert('User registered successfully!');
    this.user = { username: '', password: '' };
  }
}

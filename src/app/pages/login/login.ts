import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/models/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;
  hidePassword = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, ingrese su usuario y contraseña';
      return;
    }

    const request: LoginRequest = {
      username: this.username,
      password: this.password
    };

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(request)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error(error);
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        }
      });
  }
}
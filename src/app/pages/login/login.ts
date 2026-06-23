import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/models/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';

  login(): void {

    const request: LoginRequest = {
      username: this.username,
      password: this.password
    };

    this.authService.login(request)
      .subscribe({
        next: (response) => {

          localStorage.setItem(
            'token',
            response.token
          );

          this.router.navigate(['/dashboard']);
          
        },
        error: (error) => {

          console.error(error);

          alert('Credenciales inválidas');
        }
      });
  }
}
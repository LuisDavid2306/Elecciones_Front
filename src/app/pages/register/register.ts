import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { RegisterRequest } from '../../core/models/register-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  dni = '';
  nombres = '';
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  register(): void {
    if (!this.dni || !this.nombres || !this.username || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    if (this.dni.length !== 8 || isNaN(Number(this.dni))) {
      this.errorMessage = 'El DNI debe tener exactamente 8 dígitos numéricos';
      return;
    }

    const request: RegisterRequest = {
      dni: this.dni,
      nombres: this.nombres,
      username: this.username,
      password: this.password
    };

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(request).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Cuenta creada exitosamente. Redirigiendo al login...';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
        if (error.error && typeof error.error === 'string') {
          this.errorMessage = error.error;
        } else if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'El DNI o usuario ya está registrado en el sistema.';
        }
      }
    });
  }
}

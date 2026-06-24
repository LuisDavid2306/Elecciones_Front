import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/login-request';
import { RegisterRequest } from '../models/register-request';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  login(request: LoginRequest): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/api/auth/login`,
      request
    );
  }

  register(request: RegisterRequest): Observable<string> {
    return this.http.post(
      `${environment.apiUrl}/api/auth/register`,
      request,
      { responseType: 'text' }
    );
  }
}
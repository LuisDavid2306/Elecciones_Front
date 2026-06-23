import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { CiudadanoRequest } from '../models/ciudadano-request';
import { CiudadanoResponse } from '../models/ciudadano-response';

@Injectable({
  providedIn: 'root'
})
export class CiudadanoService {

  private http = inject(HttpClient);

  listar(): Observable<CiudadanoResponse[]> {

    return this.http.get<CiudadanoResponse[]>(
      `${environment.apiUrl}/api/ciudadanos`
    );
  }

  crear(
    request: CiudadanoRequest
  ): Observable<CiudadanoResponse> {

    return this.http.post<CiudadanoResponse>(
      `${environment.apiUrl}/api/ciudadanos`,
      request
    );
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { CandidatoRequest } from '../models/candidato-request';
import { CandidatoResponse } from '../models/candidato-response';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private http = inject(HttpClient);

  listar(): Observable<CandidatoResponse[]> {

    return this.http.get<CandidatoResponse[]>(
      `${environment.apiUrl}/api/candidatos`
    );
  }

  crear(
    request: CandidatoRequest
  ): Observable<CandidatoResponse> {

    return this.http.post<CandidatoResponse>(
      `${environment.apiUrl}/api/candidatos`,
      request
    );
  }

  listarPorEleccion(eleccionId: number): Observable<CandidatoResponse[]> {
    return this.http.get<CandidatoResponse[]>(
      `${environment.apiUrl}/api/candidatos/eleccion/${eleccionId}`
    );
  }
}
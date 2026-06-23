import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { VotoRequest } from '../models/voto-request';
import { VotoResponse } from '../models/voto-response';

@Injectable({
  providedIn: 'root'
})
export class VotacionService {

  private http = inject(HttpClient);

  votar(
    request: VotoRequest
  ): Observable<VotoResponse> {

    return this.http.post<VotoResponse>(
      `${environment.apiUrl}/api/votaciones`,
      request
    );
  }

  listar(): Observable<VotoResponse[]> {

    return this.http.get<VotoResponse[]>(
      `${environment.apiUrl}/api/votaciones`
    );
  }
}
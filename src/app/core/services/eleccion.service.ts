import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { EleccionRequest } from '../models/eleccion-request';
import { EleccionResponse } from '../models/eleccion-response';

@Injectable({
  providedIn: 'root'
})
export class EleccionService {

  private http = inject(HttpClient);

  listar(): Observable<EleccionResponse[]> {

    return this.http.get<EleccionResponse[]>(
      `${environment.apiUrl}/api/elecciones`
    );
  }

  crear(
    request: EleccionRequest
  ): Observable<EleccionResponse> {

    return this.http.post<EleccionResponse>(
      `${environment.apiUrl}/api/elecciones`,
      request
    );
  }
}
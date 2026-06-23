import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { ResultadoResponse } from '../models/resultado-response';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  private http = inject(HttpClient);

  listar(): Observable<ResultadoResponse[]> {

    return this.http.get<ResultadoResponse[]>(
      `${environment.apiUrl}/api/resultados`
    );
  }
}
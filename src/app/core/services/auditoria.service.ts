import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { AuditoriaResponse } from '../models/auditoria-response';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  private http = inject(HttpClient);

  listar(): Observable<AuditoriaResponse[]> {

    return this.http.get<AuditoriaResponse[]>(
      `${environment.apiUrl}/api/auditoria`
    );
  }
}
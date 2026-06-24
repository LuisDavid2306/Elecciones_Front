import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadoService } from '../../core/services/resultado.service';

@Component({
  selector: 'app-resultados',
  imports: [CommonModule],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css'
})
export class ResultadosComponent implements OnInit {

  private service =
    inject(ResultadoService);

  resultados: any[] = [];

  ngOnInit(): void {

    this.cargar();
  }

  cargar(): void {

    this.service
      .listar()
      .subscribe((data: any) => {
        console.log('Respuesta del backend (resultados):', data);
        // Si el backend devuelve un objeto que envuelve el array (ej. { data: [...] } o { content: [...] })
        if (Array.isArray(data)) {
          this.resultados = data;
        } else if (data && data.data && Array.isArray(data.data)) {
          this.resultados = data.data;
        } else if (data && data.content && Array.isArray(data.content)) {
          this.resultados = data.content;
        } else {
          // Fallback para buscar un array dentro de los valores del objeto
          this.resultados = Object.values(data).find(val => Array.isArray(val)) as any[] || [];
        }
      });
  }
}
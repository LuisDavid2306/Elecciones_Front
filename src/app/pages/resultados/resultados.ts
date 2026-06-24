import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ResultadoService } from '../../core/services/resultado.service';
import { EleccionService } from '../../core/services/eleccion.service';
import { CandidatoService } from '../../core/services/candidato.service';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css'
})
export class ResultadosComponent implements OnInit {

  private resultadoService = inject(ResultadoService);
  private eleccionService = inject(EleccionService);
  private candidatoService = inject(CandidatoService);

  resultadosRaw: any[] = [];
  elecciones: any[] = [];
  candidatos: any[] = [];

  resultadosFiltrados: any[] = [];
  eleccionIdSeleccionada = 0;
  totalVotosEleccion = 0;
  isLoading = true;

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.isLoading = true;
    let completed = 0;

    const checkComplete = () => {
      completed++;
      if (completed === 3) {
        this.isLoading = false;
        if (this.elecciones && this.elecciones.length > 0) {
          this.eleccionIdSeleccionada = this.elecciones[0].id;
          this.filtrarResultados();
        }
      }
    };

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
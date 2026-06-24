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

    this.eleccionService.listar().subscribe({
      next: (data) => {
        this.elecciones = data;
        checkComplete();
      },
      error: () => checkComplete()
    });

    this.candidatoService.listar().subscribe({
      next: (data) => {
        this.candidatos = data;
        checkComplete();
      },
      error: () => checkComplete()
    });

    this.resultadoService.listar().subscribe({
      next: (data) => {
        this.resultadosRaw = data;
        checkComplete();
      },
      error: () => checkComplete()
    });
  }

  onEleccionChange(): void {
    this.filtrarResultados();
  }

  filtrarResultados(): void {
    if (!this.eleccionIdSeleccionada) {
      this.resultadosFiltrados = [];
      this.totalVotosEleccion = 0;
      return;
    }

    const rawFiltered = this.resultadosRaw.filter(r => r.eleccionId == this.eleccionIdSeleccionada);
    this.totalVotosEleccion = rawFiltered.reduce((sum, r) => sum + r.totalVotos, 0);

    this.resultadosFiltrados = rawFiltered.map(r => {
      const cand = this.candidatos.find(c => c.id == r.candidatoId);
      const porcentaje = this.totalVotosEleccion > 0 ? (r.totalVotos / this.totalVotosEleccion) * 100 : 0;
      return {
        ...r,
        candidatoNombre: cand ? cand.nombres : `Candidato #${r.candidatoId}`,
        candidatoPartido: cand ? cand.partido : 'Independiente',
        porcentaje: porcentaje.toFixed(1)
      };
    }).sort((a, b) => b.totalVotos - a.totalVotos);
  }
}
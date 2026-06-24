import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuditoriaService } from '../../core/services/auditoria.service';
import { EleccionService } from '../../core/services/eleccion.service';
import { CandidatoService } from '../../core/services/candidato.service';

@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auditoria.html',
  styleUrl: './auditoria.css'
})
export class AuditoriaComponent implements OnInit {

  private service = inject(AuditoriaService);
  private eleccionService = inject(EleccionService);
  private candidatoService = inject(CandidatoService);

  auditorias: any[] = [];
  elecciones: any[] = [];
  candidatos: any[] = [];

  searchQuery = '';
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

    this.service.listar().subscribe({
      next: (data) => {
        this.auditorias = data;
        checkComplete();
      },
      error: () => checkComplete()
    });
  }

  get filteredAuditorias(): any[] {
    if (!this.searchQuery) {
      return this.auditorias;
    }
    const query = this.searchQuery.trim().toLowerCase();
    return this.auditorias.filter(a => a.dni && a.dni.toLowerCase().includes(query));
  }

  getEleccionNombre(id: number): string {
    const e = this.elecciones.find(x => x.id == id);
    return e ? e.nombre : `Elección #${id}`;
  }

  getCandidatoNombre(id: number): string {
    const c = this.candidatos.find(x => x.id == id);
    return c ? `${c.nombres} (${c.partido})` : `Candidato #${id}`;
  }
}
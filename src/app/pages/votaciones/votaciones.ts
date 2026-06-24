import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VotacionService } from '../../core/services/votacion.service';
import { EleccionService } from '../../core/services/eleccion.service';
import { CandidatoService } from '../../core/services/candidato.service';

@Component({
  selector: 'app-votaciones',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './votaciones.html',
  styleUrl: './votaciones.css'
})
export class VotacionesComponent implements OnInit {

  private votacionService = inject(VotacionService);
  private eleccionService = inject(EleccionService);
  private candidatoService = inject(CandidatoService);

  votos: any[] = [];
  elecciones: any[] = [];
  candidatos: any[] = [];
  candidatosDeEleccion: any[] = [];

  // Wizard state
  activeTab: 'wizard' | 'history' = 'wizard';
  paso = 1;
  dni = '';
  eleccionId = 0;
  candidatoId = 0;
  
  selectedEleccion: any = null;
  selectedCandidato: any = null;
  
  showConfirmModal = false;
  votoExitoso = false;
  comprobante: any = null;
  errorMessage = '';
  isLoading = false;

  ngOnInit(): void {
    this.cargarVotos();
    this.cargarElecciones();
    this.cargarCandidatos();
  }

  cargarVotos(): void {
    this.votacionService.listar().subscribe(data => {
      this.votos = data;
    });
  }

  cargarElecciones(): void {
    this.eleccionService.listar().subscribe(data => {
      this.elecciones = data;
    });
  }

  cargarCandidatos(): void {
    this.candidatoService.listar().subscribe(data => {
      this.candidatos = data;
    });
  }

  seleccionarEleccion(eleccion: any): void {
    this.selectedEleccion = eleccion;
    this.eleccionId = eleccion.id;
    this.isLoading = true;
    this.errorMessage = '';
    
    this.candidatoService.listarPorEleccion(eleccion.id).subscribe({
      next: (data) => {
        this.candidatosDeEleccion = data;
        this.isLoading = false;
        this.paso = 2;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = 'No se pudieron cargar los candidatos de la elección.';
      }
    });
  }

  validarDni(): void {
    if (!this.dni || this.dni.length !== 8 || isNaN(Number(this.dni))) {
      this.errorMessage = 'Ingrese un DNI válido de 8 dígitos.';
      return;
    }
    this.errorMessage = '';
    this.paso = 3;
  }

  seleccionarCandidato(candidato: any): void {
    this.selectedCandidato = candidato;
    this.candidatoId = candidato.id;
  }

  abrirConfirmacion(): void {
    if (!this.candidatoId) {
      this.errorMessage = 'Debe seleccionar un candidato.';
      return;
    }
    this.errorMessage = '';
    this.showConfirmModal = true;
  }

  cerrarConfirmacion(): void {
    this.showConfirmModal = false;
  }

  votar(): void {
    this.isLoading = true;
    this.showConfirmModal = false;
    this.errorMessage = '';

    this.votacionService
      .votar({
        dni: this.dni,
        eleccionId: this.eleccionId,
        candidatoId: this.candidatoId
      })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.votoExitoso = true;
          this.comprobante = {
            id: response.id || Math.floor(Math.random() * 9000) + 1000,
            dni: this.dni,
            eleccion: this.selectedEleccion.nombre,
            candidato: this.selectedCandidato.nombres,
            partido: this.selectedCandidato.partido,
            fechaVoto: response.fechaVoto || new Date().toLocaleString()
          };
          this.cargarVotos();
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Error al emitir el voto. Verifique si ya votó o si está habilitado en el padrón.';
          }
        }
      });
  }

  reiniciarWizard(): void {
    this.paso = 1;
    this.dni = '';
    this.eleccionId = 0;
    this.candidatoId = 0;
    this.selectedEleccion = null;
    this.selectedCandidato = null;
    this.candidatosDeEleccion = [];
    this.votoExitoso = false;
    this.comprobante = null;
    this.errorMessage = '';
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
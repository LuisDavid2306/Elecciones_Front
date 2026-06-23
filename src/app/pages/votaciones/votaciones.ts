import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VotacionService } from '../../core/services/votacion.service';
import { EleccionService } from '../../core/services/eleccion.service';
import { CandidatoService } from '../../core/services/candidato.service';

@Component({
  selector: 'app-votaciones',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './votaciones.html',
  styleUrl: './votaciones.css'
})
export class VotacionesComponent implements OnInit {

  private votacionService =
    inject(VotacionService);

  private eleccionService =
    inject(EleccionService);

  private candidatoService =
    inject(CandidatoService);

  votos: any[] = [];

  elecciones: any[] = [];

  candidatos: any[] = [];

  dni = '';

  eleccionId = 0;

  candidatoId = 0;

  ngOnInit(): void {

    this.cargarVotos();

    this.cargarElecciones();

    this.cargarCandidatos();
  }

  cargarVotos(): void {

    this.votacionService
      .listar()
      .subscribe(data => {

        this.votos = data;
      });
  }

  cargarElecciones(): void {

    this.eleccionService
      .listar()
      .subscribe(data => {

        this.elecciones = data;
      });
  }

  cargarCandidatos(): void {

    this.candidatoService
      .listar()
      .subscribe(data => {

        this.candidatos = data;
      });
  }

  votar(): void {

    this.votacionService
      .votar({
        dni: this.dni,
        eleccionId: this.eleccionId,
        candidatoId: this.candidatoId
      })
      .subscribe({

        next: () => {

          alert('Voto registrado');

          this.dni = '';

          this.eleccionId = 0;

          this.candidatoId = 0;

          this.cargarVotos();
        },

        error: err => {

          alert(
            err.error.message
          );
        }
      });
  }
}
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CandidatoService } from '../../core/services/candidato.service';
import { EleccionService } from '../../core/services/eleccion.service';

@Component({
  selector: 'app-candidatos',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './candidatos.html',
  styleUrl: './candidatos.css'
})
export class CandidatosComponent implements OnInit {

  private candidatoService =
    inject(CandidatoService);

  private eleccionService =
    inject(EleccionService);

  candidatos: any[] = [];
  elecciones: any[] = [];

  nombres = '';
  partido = '';
  eleccionId = 0;

  ngOnInit(): void {

    this.cargarCandidatos();

    this.cargarElecciones();
  }

  cargarCandidatos(): void {

    this.candidatoService
      .listar()
      .subscribe(data => {

        this.candidatos = data;
      });
  }

  cargarElecciones(): void {

    this.eleccionService
      .listar()
      .subscribe(data => {

        this.elecciones = data;
      });
  }

  guardar(): void {

    this.candidatoService
      .crear({
        nombres: this.nombres,
        partido: this.partido,
        eleccionId: this.eleccionId
      })
      .subscribe(() => {

        this.nombres = '';
        this.partido = '';
        this.eleccionId = 0;

        this.cargarCandidatos();
      });
  }
}
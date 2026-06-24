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
      .subscribe((data: any) => {
        if (Array.isArray(data)) {
          this.candidatos = data;
        } else if (data && data.data && Array.isArray(data.data)) {
          this.candidatos = data.data;
        } else if (data && data.content && Array.isArray(data.content)) {
          this.candidatos = data.content;
        } else {
          this.candidatos = Object.values(data).find(val => Array.isArray(val)) as any[] || [];
        }
      });
  }

  cargarElecciones(): void {

    this.eleccionService
      .listar()
      .subscribe((data: any) => {
        if (Array.isArray(data)) {
          this.elecciones = data;
        } else if (data && data.data && Array.isArray(data.data)) {
          this.elecciones = data.data;
        } else if (data && data.content && Array.isArray(data.content)) {
          this.elecciones = data.content;
        } else {
          this.elecciones = Object.values(data).find(val => Array.isArray(val)) as any[] || [];
        }
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

  getEleccionNombre(id: number): string {
    const eleccion = this.elecciones.find(e => e.id == id);
    return eleccion ? eleccion.nombre : `Elección #${id}`;
  }
}
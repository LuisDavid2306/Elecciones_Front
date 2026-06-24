import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EleccionService } from '../../core/services/eleccion.service';

@Component({
  selector: 'app-elecciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './elecciones.html',
  styleUrl: './elecciones.css'
})
export class EleccionesComponent implements OnInit {

  private service = inject(EleccionService);

  elecciones: any[] = [];

  nombre = '';
  fechaInicio = '';
  fechaFin = '';

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {

    this.service.listar()
      .subscribe(data => {

        this.elecciones = data;
      });
  }

  guardar(): void {

    this.service.crear({
      nombre: this.nombre,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin
    })
    .subscribe(() => {

      this.nombre = '';
      this.fechaInicio = '';
      this.fechaFin = '';

      this.cargar();
    });
  }

  limpiar(): void {
    this.nombre = '';
    this.fechaInicio = '';
    this.fechaFin = '';
  }
}
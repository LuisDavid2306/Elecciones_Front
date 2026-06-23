import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CiudadanoService } from '../../core/services/ciudadano.service';

import { CiudadanoResponse } from '../../core/models/ciudadano-response';
import { CiudadanoRequest } from '../../core/models/ciudadano-request';

@Component({
  selector: 'app-ciudadanos',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ciudadanos.html',
  styleUrl: './ciudadanos.css'
})
export class CiudadanosComponent implements OnInit {

  private ciudadanoService =
    inject(CiudadanoService);

  ciudadanos: CiudadanoResponse[] = [];

  dni = '';
  nombres = '';
  apellidos = '';
  correo = '';

  ngOnInit(): void {

    this.cargarCiudadanos();
  }

  cargarCiudadanos(): void {

    this.ciudadanoService
      .listar()
      .subscribe(data => {

        this.ciudadanos = data;
      });
  }

  guardar(): void {

    const request: CiudadanoRequest = {

      dni: this.dni,
      nombres: this.nombres,
      apellidos: this.apellidos,
      correo: this.correo,
      habilitado: true
    };

    this.ciudadanoService
      .crear(request)
      .subscribe({

        next: () => {

          this.limpiar();

          this.cargarCiudadanos();
        },

        error: err => {

          alert(
            err.error.message
          );
        }
      });
  }

  limpiar(): void {

    this.dni = '';
    this.nombres = '';
    this.apellidos = '';
    this.correo = '';
  }
}
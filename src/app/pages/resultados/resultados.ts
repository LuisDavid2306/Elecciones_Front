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
      .subscribe(data => {

        this.resultados = data;
      });
  }
}
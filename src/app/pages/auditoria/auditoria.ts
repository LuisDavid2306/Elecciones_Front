import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditoriaService } from '../../core/services/auditoria.service';

@Component({
  selector: 'app-auditoria',
  imports: [CommonModule],
  templateUrl: './auditoria.html',
  styleUrl: './auditoria.css'
})
export class AuditoriaComponent implements OnInit {

  private service =
    inject(AuditoriaService);

  auditorias: any[] = [];

  ngOnInit(): void {

    this.cargar();
  }

  cargar(): void {

    this.service
      .listar()
      .subscribe(data => {

        this.auditorias = data;
      });
  }
}
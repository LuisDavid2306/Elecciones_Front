import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CiudadanoService } from '../../core/services/ciudadano.service';
import { EleccionService } from '../../core/services/eleccion.service';
import { CandidatoService } from '../../core/services/candidato.service';
import { VotacionService } from '../../core/services/votacion.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  private ciudadanoService = inject(CiudadanoService);
  private eleccionService = inject(EleccionService);
  private candidatoService = inject(CandidatoService);
  private votacionService = inject(VotacionService);

  totalCiudadanos = 0;
  totalElecciones = 0;
  totalCandidatos = 0;
  totalVotos = 0;
  isLoading = true;

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.isLoading = true;
    let completedRequests = 0;
    
    const checkComplete = () => {
      completedRequests++;
      if (completedRequests === 4) {
        this.isLoading = false;
      }
    };

    this.ciudadanoService.listar().subscribe({
      next: (res) => { this.totalCiudadanos = res ? res.length : 0; checkComplete(); },
      error: () => checkComplete()
    });

    this.eleccionService.listar().subscribe({
      next: (res) => { this.totalElecciones = res ? res.length : 0; checkComplete(); },
      error: () => checkComplete()
    });

    this.candidatoService.listar().subscribe({
      next: (res) => { this.totalCandidatos = res ? res.length : 0; checkComplete(); },
      error: () => checkComplete()
    });

    this.votacionService.listar().subscribe({
      next: (res) => { this.totalVotos = res ? res.length : 0; checkComplete(); },
      error: () => checkComplete()
    });
  }
}
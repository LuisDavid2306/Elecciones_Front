import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { CiudadanosComponent } from './pages/ciudadanos/ciudadanos';
import { EleccionesComponent } from './pages/elecciones/elecciones';
import { CandidatosComponent } from './pages/candidatos/candidatos';
import { VotacionesComponent } from './pages/votaciones/votaciones';
import { ResultadosComponent } from './pages/resultados/resultados';
import { AuditoriaComponent } from './pages/auditoria/auditoria';

export const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'ciudadanos',
    component: CiudadanosComponent
  },

  {
    path: 'elecciones',
    component: EleccionesComponent
  },

  {
    path: 'candidatos',
    component: CandidatosComponent
  },

  {
    path: 'votaciones',
    component: VotacionesComponent
  },

  {
    path: 'resultados',
    component: ResultadosComponent
  },

  {
    path: 'auditoria',
    component: AuditoriaComponent
  }
];
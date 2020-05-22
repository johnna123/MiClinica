import { Routes } from '@angular/router';

import { MainPacientesComponent } from './main-pacientes/main-pacientes.component';
import { MainCitasComponent } from './main-citas/main-citas.component';

export const routes: Routes = [
    { path: 'pacientes', component: MainPacientesComponent },
    { path: 'citas', component: MainCitasComponent },
    { path: '', redirectTo: 'pacientes', pathMatch: 'full' }
];
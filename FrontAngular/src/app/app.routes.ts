import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { BuscadorComponent } from './buscador/buscador.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'buscador', component: BuscadorComponent },
    { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];

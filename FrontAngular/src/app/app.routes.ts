import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'buscador', component: BuscadorComponent },
    { path: 'registro', component: RegistroComponent },
];

import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';

export const routes: Routes = [
    { path: '', redirectTo: '/bienvenida', pathMatch: 'full' },
    { path: 'bienvenida', component: BienvenidaComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'buscador', component: BuscadorComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent }

];

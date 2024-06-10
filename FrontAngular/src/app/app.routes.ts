import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { HistorialComponent } from './historial/historial.component';
import { UserComponent } from './user/user.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { CrearRecetaComponent } from './crear-receta/crear-receta.component';
import { DetallesComponent } from './detalles/detalles.component';

export const routes: Routes = [
    { path: '', redirectTo: '/bienvenida', pathMatch: 'full' },
    { path: 'bienvenida', component: BienvenidaComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'buscador', component: BuscadorComponent },
    { path: 'login', component: LoginComponent },
    { path: 'historial', component: HistorialComponent },
    { path: 'perfil', component: UserComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'favoritos', component: FavoritosComponent },
    { path: 'crearReceta', component: CrearRecetaComponent},
    { path: 'detalles/:id', component: DetallesComponent }

];

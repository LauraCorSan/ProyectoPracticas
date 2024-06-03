import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { InicioComponent } from './inicio/inicio.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , BienvenidaComponent, LoginComponent, UserComponent, CabeceraComponent, InicioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FrontAngular';
}

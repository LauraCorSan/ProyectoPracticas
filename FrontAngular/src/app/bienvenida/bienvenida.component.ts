import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';
import { BuscadorComponent } from '../buscador/buscador.component';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, InicioComponent, BuscadorComponent, LoginComponent, RegistroComponent],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.scss'
})

export class BienvenidaComponent {
}

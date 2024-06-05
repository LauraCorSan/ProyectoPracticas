import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';
import { BuscadorComponent } from '../buscador/buscador.component';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, BuscadorComponent],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.scss'
})
export class CabeceraComponent {

}

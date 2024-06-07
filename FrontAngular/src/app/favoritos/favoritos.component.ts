import { Component } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CabeceraComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent {

}

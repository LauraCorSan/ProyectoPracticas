import { Component } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CabeceraComponent],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {

}

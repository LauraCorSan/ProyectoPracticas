import { Component } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CabeceraComponent],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss'
})
export class BuscadorComponent {
  validateFields(): boolean {
    return true;
  }
}

function isFilled(field: HTMLInputElement): boolean {
  const value = field.value;

  if (value == null || value == undefined || value.length == 0 || value.trim().length == 0) {
    alert('The field \"' + field.name + '\" is empty');
    return false;
  }
  return true;
}
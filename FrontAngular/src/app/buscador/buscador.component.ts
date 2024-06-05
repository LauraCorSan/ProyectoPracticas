import { Component } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CabeceraComponent],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss'
})
export class BuscadorComponent {
  constructor(private http: HttpClient) {}
  validateFields(): boolean {
    return true;
  }

  ngOnInit() {
    this.http.get('http://localhost:8080/cuisine/getAll').subscribe(data => {
      if(data){
        if (Array.isArray(data) && data.length > 0) {
          this.insertCuisine(data);
        }
      }
    });
  }

  insertCuisine(tiposCocina: any[]) {
    const selectElement = document.getElementById('type') as HTMLSelectElement;
    tiposCocina.forEach(tipo => {
      const option = document.createElement('option');
      option.value = tipo.type;
      option.text = tipo.type;
      selectElement.add(option);
    });
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
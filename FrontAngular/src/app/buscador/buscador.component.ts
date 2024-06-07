import { Component, OnInit } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CabeceraComponent],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:8080/cuisine/getAll').subscribe((data: any) => {
      if (data && Array.isArray(data) && data.length > 0) {
        this.insertCuisine(data);
      }
    });
  }

  validateFields(): boolean {
    const nameField = document.getElementById('name') as HTMLInputElement;
    return this.isFilled(nameField);
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

  private isFilled(field: HTMLInputElement): boolean {
    const value = field.value;
    if (value == null || value.trim().length === 0) {
      alert(`The field "${field.name}" is empty`);
      return false;
    }
    return true;
  }
}

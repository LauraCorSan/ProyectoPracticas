import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import { InicioComponent } from '../inicio/inicio.component';
import { CabeceraComponent } from '../cabecera/cabecera.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive, InicioComponent, CabeceraComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})


export class UserComponent {

  constructor(private http: HttpClient) {}
  //TODO CREAR
  user =  new User('JaneS123','Jane', 'Smith', 'jane@example.com', ['Nuts']) ;

  onSubmit(){
    //TODO LLAMADA A BBDD PARA ACTUALIZAR
    //sino solo recargar pagina
    //validacion campos no vacios

    this.http.get('http://localhost:8080/api/clientes').subscribe(data => {

    });
  }
}

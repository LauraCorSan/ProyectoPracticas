import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
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

  constructor(private http: HttpClient, private router: Router) {
    /*const user = {
      "username":username,
      "password":password
    }
    this.http.post('http://localhost:8080/api/user', user ).subscribe(data => {
      // Pillamos el objeto user que devuelve la llamada y creamos un usermodel con esos datos
      data=
        user =  new User('JaneS123','Jane', 'Smith', 'jane@example.com', ['Nuts']) ;

    });*/
  }

  /*const user = {
    "name": name,
    "surname": surname,
    "email": email,
    "username": username,
    "password": password,
    "dateOfBirth": birthDate,
    "registrationDate": resgitrationDate,
    "alergens": intolerances,
  }*/
  user =  new User('JaneS123','Jane', 'Smith', 'jane@example.com', ['Nuts']) ;

  onSubmit(){
    //TODO LLAMADA A BBDD PARA ACTUALIZAR
    //sino solo recargar pagina
    //validacion campos no vacios


  }
}

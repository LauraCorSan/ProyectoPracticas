import { Component, Injectable } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BienvenidaComponent } from '../bienvenida/bienvenida.component';
import { InicioComponent } from '../inicio/inicio.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, InicioComponent, BienvenidaComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable()
export class LoginComponent {

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(){
    const userElement = document.getElementById('user') as HTMLInputElement;
    const usuario = userElement.value;

    const paswordElement = document.getElementById('pass') as HTMLInputElement;
    const password = paswordElement.value;

    // Reemplaza la URL con la correcta para tu backend
    /*this.http.post<{ valid: boolean }>('http://localhost:8080/api/clientes', { usuario, password }).subscribe(data => {
      if(data.valid){
        this.router.navigate(['/inicio']);
      } else {
        alert('El usuario o la contraseña no son validos');
      }
    });*/
    //TODO NO FUNCIONA AUN


    // Simulación de autenticación sin llamada HTTP
    if (usuario && password) {
      this.router.navigate(['/inicio']);
    } else {
      alert('El usuario o la contraseña no son válidos');
    }
    this.router.navigate(['/inicio']);
  }
}


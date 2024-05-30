import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

@Injectable()
export class LoginComponent {

constructor(private http: HttpClient) {}
  isUser(){
    const userElement = document.getElementById(
      'user'
    ) as HTMLInputElement;
    const usuario = userElement.value;

    const paswordElement = document.getElementById('pass') as HTMLInputElement
    const password = paswordElement.value;

    this.http.get('http://localhost:8080/api/clientes').subscribe(data => {
      console.log(data);
    })

    alert('El usuario o la contraseña no son validos')
  }
}


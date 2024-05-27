import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  isUser(){
    const userElement = document.getElementById(
      'user'
    ) as HTMLInputElement;
    const usuario = userElement.value;

    const paswordElement = document.getElementById('pass') as HTMLInputElement
    const password = paswordElement.value;

    alert('El usuario o la contraseña no son validos');
  }
}


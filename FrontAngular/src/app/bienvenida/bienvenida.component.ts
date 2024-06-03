import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,LoginComponent, RegistroComponent],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.scss'
})

export class BienvenidaComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  navigateToRegister() {
    this.router.navigate(['registro']);
  }
}

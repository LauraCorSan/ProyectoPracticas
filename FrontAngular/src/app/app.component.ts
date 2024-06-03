import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< Updated upstream
=======
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { InicioComponent } from './inicio/inicio.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
>>>>>>> Stashed changes

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< Updated upstream
  imports: [RouterOutlet],
=======
  imports: [RouterOutlet , BienvenidaComponent, LoginComponent, UserComponent, CabeceraComponent, InicioComponent],

>>>>>>> Stashed changes
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'InstanteRecipes';
}

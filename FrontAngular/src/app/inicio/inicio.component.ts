import { Component } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../cookie.service'; 
import { BienvenidaComponent } from '../bienvenida/bienvenida.component';
import { RouterOutlet, Router } from '@angular/router';



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CabeceraComponent, CommonModule, BienvenidaComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  recipes: any[] = [];

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}
  ngOnInit() {
    if(this.cookieService.get('usuario') == null || this.cookieService.get('usuario') == ""){
      this.router.navigate(['/bienvenida']);
    }
    // Llamar a la api de recetas aleatorias cuando la tengamos 
    this.http.get('http://localhost:8080/recipes/getAll').subscribe(data => {
      if(data){
        if (Array.isArray(data) && data.length > 0) {
          this.recipes=data;
        }
      }
    });
  }
}

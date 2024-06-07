import { Component } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../cookie.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CabeceraComponent, CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {
  recipes: any[] = [];
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  ngOnInit() {
    
    if(this.cookieService.get('usuario') == null || this.cookieService.get('usuario') == ""){
      this.router.navigate(['/bienvenida']);
    }

    const user={
      username:this.cookieService.get('usuario')
    }
  
    this.http.post('http://localhost:8080/api/getRecipesDone', user).subscribe(data => {
        if (data) {
          if (Array.isArray(data) && data.length > 0) {
            this.recipes = data;
          }
        }
      });
  }

}

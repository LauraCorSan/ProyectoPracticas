import { Component } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../cookie.service';
import { BienvenidaComponent } from '../bienvenida/bienvenida.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CabeceraComponent, CommonModule, BienvenidaComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  recipes: any[] = [];
  filter: string = this.cookieService.get('filter');

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }
  ngOnInit() {
    if (this.cookieService.get('filter') == null || this.cookieService.get('filter') == "") {
      this.cookieService.set('filter', 'intolerances');
    }

    if (this.cookieService.get('usuario') == null || this.cookieService.get('usuario') == "") {
      this.router.navigate(['/bienvenida']);
    }


    if (this.cookieService.get('filter') == "intolerances") {
      const user = {
        username: this.cookieService.get('usuario')
      }
      this.http.post('http://localhost:8080/recipes/getByAler', user).subscribe(data => {
        if (data) {
          if (Array.isArray(data) && data.length > 0) {
            this.recipes = data;
          }
        }
      });
    } else if (this.cookieService.get('filter') == "none") {
      this.http.get('http://localhost:8080/recipes/getAll').subscribe(data => {
        if (data) {
          if (Array.isArray(data) && data.length > 0) {
            this.recipes = data;
          }
        }
      });
    }
  }

  recipeMade(recipeId: number, recipeTitle: string, recipeImg: string) {
    if (this.cookieService.get('usuario') != null && this.cookieService.get('usuario') != "") {
      const user = {
        username: this.cookieService.get('usuario')
      };

      const recipe = {
        recipeId: recipeId,
        title: recipeTitle,
        url: recipeImg
      };

      const request = {
        requestedUsername: user,
        requestedRecipe: recipe
      };
      this.http.post('http://localhost:8080/api/addRecipe', request).subscribe(data => {
        if (data) {
          alert('Receta añadida correctamente');
        }
      });
    }
  }

  recipeFav(recipeId: number, recipeTitle: string, recipeImg: string) {
    if (this.cookieService.get('usuario') != null && this.cookieService.get('usuario') != "") {
      const user = {
        username: this.cookieService.get('usuario')
      };

      const recipe = {
        recipeId: recipeId,
        title: recipeTitle,
        url: recipeImg
      };

      const request = {
        requestedUsername: user,
        requestedRecipe: recipe
      };
      this.http.post('http://localhost:8080/api/setFavRecipe', request).subscribe(data => {
        if (data) {
          alert('Receta añadida correctamente');
        }
      });
    }
  }

  changeFilter() {
    if (this.filter === "intolerances") {
      this.cookieService.set('filter', "none");
    } else {
      this.cookieService.set('filter', "intolerances");
    }
    this.filter = this.cookieService.get('filter');
    window.location.reload();
  }
}

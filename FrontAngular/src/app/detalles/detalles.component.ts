import { Component } from '@angular/core';
import { Ingredient, Recipe } from '../recipe.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../cookie.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BienvenidaComponent } from '../bienvenida/bienvenida.component';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, BienvenidaComponent, CommonModule,],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent {
  recipeId=-1;
  ingredient = new Ingredient("Eggs");
  recipe = new Recipe(
    'Tortilla',
    'png',
    'Description',
    [this.ingredient]
  );

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.cookieService.get('usuario') == null || this.cookieService.get('usuario') == '') {
      this.router.navigate(['/bienvenida']);
    }

    const id = this.route.snapshot.paramMap.get('id');
    this.recipeId = id ? +id : 0;

    const requestId = {
      "recipeId": this.recipeId
    }

    if (this.recipeId) {
      this.http.post<Recipe>('http://localhost:8080/recipes/getInformation', requestId).subscribe(data => {
        data.summary = this.sanitizeHtml(data.summary);
        this.recipe = data;
      });
    } else {
      // Manejar el caso en que no hay ID válido
      console.error('ID de receta no válido');
    }

  }


  thisRecipeFav(): void {
    if (this.cookieService.get('usuario') != null && this.cookieService.get('usuario') != "") {
      const user = {
        username: this.cookieService.get('usuario')
      };

      const recipe = {
        recipeId: this.recipeId,
        title: this.recipe.title,
        url: this.recipe.image
      };

      const request = {
        requestedUsername: user,
        requestedRecipe: recipe
      };
      this.http.post('http://localhost:8080/api/setFavRecipe', request).subscribe(data => {
        if (data) {
          alert('Recipe Successfully Added to Favorites');
        }
      });
    }
  }

  thisRecipeMade(): void {
    if (this.cookieService.get('usuario') != null && this.cookieService.get('usuario') != "") {
      const user = {
        username: this.cookieService.get('usuario')
      };

      const recipe = {
        recipeId: this.recipeId,
        title: this.recipe.title,
        url: this.recipe.image
      };

      const request = {
        requestedUsername: user,
        requestedRecipe: recipe
      };
      this.http.post('http://localhost:8080/api/addRecipe', request).subscribe(data => {
        if (data) {
          alert('Recipe added to History correctly');
        }
      });
    }
  }
  get ingredientsString(): string {
    return this.recipe.extendedIngredients.map(a => a.original).join('\n | ');
  }

  sanitizeHtml(htmlString: string): string {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.textContent || div.innerText || '';
  }

}

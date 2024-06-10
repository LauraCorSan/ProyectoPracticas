import { Component } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CabeceraComponent, CommonModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss'
})
export class BuscadorComponent {
  recipes: any[] = [];
  
  constructor(private http: HttpClient,  private cookieService: CookieService, private router: Router) {}
  validateFields(): boolean {
    return true;
  }

  ngOnInit() {
    if(this.cookieService.get('usuario') == null || this.cookieService.get('usuario') == ""){
      this.router.navigate(['/bienvenida']);
    }
    this.http.get('http://localhost:8080/cuisine/getAll').subscribe(data => {
      if(data){
        if (Array.isArray(data) && data.length > 0) {
          this.insertCuisine(data);
        }
      }
    });
  }

  onSumbit(){
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const name = nameElement.value;

    const maxCaloriesElement = document.getElementById('maxCalories') as HTMLInputElement;
    const maxCalories = maxCaloriesElement.value;

    const minCaloriesElement = document.getElementById('minCalories') as HTMLInputElement;
    const minCalories = minCaloriesElement.value;

    const ingredientsElement = document.getElementById('ingredients') as HTMLInputElement;
    const ingredients = ingredientsElement.value;

    const typeElement = document.getElementById('type') as HTMLInputElement;
    const type = typeElement.value;

    const search={
      name:name,
      minCalories:minCalories,
      maxCalories:maxCalories,
      ingredients:ingredients,
      type:type
    }

    console.log(search);

  }

  insertCuisine(tiposCocina: any[]) {
    const selectElement = document.getElementById('type') as HTMLSelectElement;
    tiposCocina.forEach(tipo => {
      const option = document.createElement('option');
      option.value = tipo.type;
      option.text = tipo.type;
      selectElement.add(option);
    });
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
}



function isFilled(field: HTMLInputElement): boolean {
  const value = field.value;

  if (value == null || value == undefined || value.length == 0 || value.trim().length == 0) {
    alert('The field \"' + field.name + '\" is empty');
    return false;
  }
  return true;
}

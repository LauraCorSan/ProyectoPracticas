import { Component } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent {
  recipeName: string = '';
  recipeType: string = '';
  maxCalories: number | null = null;
  minCalories: number | null = null;
  ingredients: string = '';

  validateFields():void {
    if (!this.isFilled(this.recipeName, 'Recipe name'))       console.log( false);

    if (!this.isFilled(this.recipeType, 'Recipe type'))       console.log( false);

    if (this.maxCalories === null || this.maxCalories === undefined) {
      alert('The field "Maximum calories" is empty');
      console.log( false);
    }
    if (this.minCalories === null || this.minCalories === undefined) {
      alert('The field "Minimum calories" is empty');
      console.log( false);    }
    if (!this.isFilled(this.ingredients, 'Ingredients'))  console.log( false);

    if (!this.isSingleWord(this.recipeName)||!this.isFilled(this.recipeName, 'Recipe name')) {
      alert('The field "Recipe name" should contain only one word');
      console.log( false);    }

      console.log( true);  }

  isFilled(value: string, fieldName: string): boolean {
    if (!value || value.trim().length === 0) {
      alert(`The field "${fieldName}" is empty`);
      return false;
    }
    return true;
  }

  isSingleWord(value: string): boolean {
    return /^\S+$/.test(value);
  }
}

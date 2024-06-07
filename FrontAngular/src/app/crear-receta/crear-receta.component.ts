import { Component } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../cookie.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-receta',
  standalone: true,
  imports: [CabeceraComponent, CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './crear-receta.component.html',
  styleUrl: './crear-receta.component.scss'
})
export class CrearRecetaComponent {
recetaForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,  private cookieService: CookieService) {

    this.recetaForm = this.fb.group({
      Name: ['', [Validators.required, this.noWhitespaceValidator]],
      Desciption: ['', [Validators.required, this.noWhitespaceValidator]],
      Ingredients: [[], Validators.required]
    });
  }

  ngOnInit() {
    if(this.cookieService.get('usuario') == null || this.cookieService.get('usuario') == ""){
      this.router.navigate(['/bienvenida']);
    }

    this.http.get('http://localhost:8080/aler/alergenos').subscribe(data => {
      if(data){
        if (Array.isArray(data) && data.length > 0) {
          this.insertIntolerances(data);
        }
      }
    });
  }

  onSubmit() {
    if (this.recetaForm.invalid) {
      this.showErrors();
      return;
    }
    const formValues = this.recetaForm.value;

    const recipe = {
      name: formValues.Name,
      description: formValues.description,
      ingredients: this.parseIngredients(document.getElementById('ingredients') as HTMLSelectElement)
    };


    /*this.http.post('http://localhost:8080/api/createRecipe', recipe ).subscribe(data => {
      if(data){
        alert('The recipe has been upload succesfully')
      } else {
        alert('The recipe could not be upload.');
      }
    });*/
 }

  private showErrors() {
    for (const field in this.recetaForm.controls) {
      if (this.recetaForm.controls.hasOwnProperty(field)) {
        const control = this.recetaForm.get(field);
        if (control && control.invalid) {
          const errors = control.errors;
          if (errors) {
            if (errors['required']) {
              alert(`The field "${field}" is empty`);
              break;
            }
          }
        }
      }
    }
  }

  insertIntolerances(alergenos: any[]) {
    const selectElement = document.getElementById('ingredients') as HTMLSelectElement;
    alergenos.forEach(alergeno => {
      const option = document.createElement('option');
      option.value = alergeno.name;
      option.text = alergeno.name;
      selectElement.add(option);
    });
  }

  private noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  private parseIngredients(listIntolerances: HTMLSelectElement) {
    const selectedOptions = Array.from(listIntolerances.selectedOptions);
    const intolerances = selectedOptions.map(option => ({ name: option.textContent }));
    return intolerances.length > 0 ? intolerances : [];
  }

}

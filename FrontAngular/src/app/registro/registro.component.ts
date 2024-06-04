import { Component} from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BienvenidaComponent } from '../bienvenida/bienvenida.component';
import { InicioComponent } from '../inicio/inicio.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive, InicioComponent, BienvenidaComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})

export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registroForm = this.fb.group({
      Name: ['', [Validators.required, this.noWhitespaceValidator]],
      Surname: ['', [Validators.required, this.noWhitespaceValidator]],
      Email: ['', [Validators.required, Validators.email]],
      Username: ['', [Validators.required, this.noWhitespaceValidator]],
      Password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/)]],
      BirthDate: ['', [Validators.required, this.dateNotInFutureValidator]],
      Intolerances: [[], Validators.required]//TODO
    });
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      this.showErrors();
      return;
    }
    const formValues = this.registroForm.value;
    console.log('Form Values:', formValues);

    const nameElement = document.getElementById('name') as HTMLInputElement;
    const name = nameElement.value;

    const surnameElement = document.getElementById('surname') as HTMLInputElement;
    const surname = surnameElement.value;

    const emailElement = document.getElementById('email') as HTMLInputElement;
    const email = emailElement.value;

    const usernameElement = document.getElementById('username') as HTMLInputElement;
    const username = usernameElement.value;

    const paswordElement = document.getElementById('password') as HTMLInputElement;
    const password = paswordElement.value;

    const dateElement = document.getElementById('birthdate') as HTMLInputElement;
    const birthDate = dateElement.value;

    const resgitrationDate = new Date();

    const intolerancesElement = document.getElementById('intolerances') as HTMLSelectElement;
    const intolerances = this.parseIntolerances(intolerancesElement);

    const user = {
      "name": name,
      "surname": surname,
      "email": email,
      "username": username,
      "password": password,
      "dateOfBirth": birthDate,
      "registrationDate": resgitrationDate,
      "alergens": intolerances,
    }

    this.http.post('http://localhost:8080/api/create', user ).subscribe(data => {
      if(data){
        this.router.navigate(['/inicio']);
      } else {
        alert('No se ha podido registrar el usuario');
      }
    });
  }

  private showErrors() {
    for (const field in this.registroForm.controls) {
      if (this.registroForm.controls.hasOwnProperty(field)) {
        const control = this.registroForm.get(field);
        if (control && control.invalid) {
          const errors = control.errors;
          if (errors) {
            if (errors['required']) {
              alert(`El campo "${field}" está vacío`);
              break;
            } else if (errors['email']) {
              alert('Use una dirección de correo electrónico válida');
              break;
            } else if (errors['pattern']) {
              alert('La contraseña debe contener 8-15 caracteres y al menos una letra mayúscula, una minúscula, un número y un carácter especial ($@$!%*?&) sin espacios');
              break;
            } else if (errors['dateNotInFuture']) {
              alert('La fecha de nacimiento no puede ser en el futuro');
              break;
            }
          }
        }
      }
    }
  }

  private noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  private dateNotInFutureValidator(control: FormControl) {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    const isValid = selectedDate < currentDate;
    return isValid ? null : { dateNotInFuture: true };
  }

  private parseIntolerances(listIntolerances: HTMLSelectElement) {
    //TODO pasar a array de intolerances y si es none pasar array vacio
    //[{"name": "huevo"}, {"name": "pollo"}]
    /*const arrayIntolerances = listIntolerances.selectedOptions;
    return (arrayIntolerances[0].textContent=="none") ? " ": arrayIntolerances;*/
  }
}

import { Component} from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BienvenidaComponent } from '../bienvenida/bienvenida.component';
import { InicioComponent } from '../inicio/inicio.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from '../cookie.service'; 


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive, InicioComponent, BienvenidaComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})

export class RegistroComponent {
  registroForm: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private cookieService: CookieService) {

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

  ngOnInit() {
    this.http.get('http://localhost:8080/aler/alergenos').subscribe(data => {
      if(data){
        if (Array.isArray(data) && data.length > 0) {
          this.insertIntolerances(data);
        }
      }
    });
    // Esta línea hay que ponerla en el login cuando el inicio de sesión es correcto con su userName y borrarla de aquí
    //this.cookieService.set('usuario', 'userName');
  }
 
  onSubmit() {
    if (this.registroForm.invalid) {
      this.showErrors();
      return;
    }
    const formValues = this.registroForm.value;
  
    const user = {
      name: formValues.Name,
      surname: formValues.Surname,
      email: formValues.Email,
      username: formValues.Username,
      password: formValues.Password,
      dateOfBirth: formValues.BirthDate,
      registrationDate: this.formatDate(new Date()),
      alergens: this.parseIntolerances(document.getElementById('intolerances') as HTMLSelectElement)
    };


    this.http.post('http://localhost:8080/api/create', user ).subscribe(data => {
      if(data){
        this.router.navigate(['/inicio']);
      } else {

        alert('The user could not be registered.');
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
              alert(`The field "${field}" is empty`);
              break;
            } else if (errors['email']) {
              alert('Use a valid email address.');
              break;
            } else if (errors['pattern']) {
              alert('The password must contain 8-15 characters, at least one uppercase letter, one lowercase letter, one number, and one special character ($@$!%*?&), without blank spaces.');
              break;
            } else if (errors['dateNotInFuture']) {
              alert('The birth date must be before the current date.');
              break;
            }
          }
        }
      }
    }
  }

  insertIntolerances(alergenos: any[]) {
    const selectElement = document.getElementById('intolerances') as HTMLSelectElement;
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

  private dateNotInFutureValidator(control: FormControl) {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    const isValid = selectedDate < currentDate;
    return isValid ? null : { dateNotInFuture: true };
  }


  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses de 0 a 11, por eso sumamos 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private parseIntolerances(listIntolerances: HTMLSelectElement) {
    const selectedOptions = Array.from(listIntolerances.selectedOptions);
    const intolerances = selectedOptions.map(option => ({ name: option.textContent }));
    return intolerances.length > 0 ? intolerances : [];
  }

}


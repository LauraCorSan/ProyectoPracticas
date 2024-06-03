import { Component, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registroForm = this.fb.group({
      NombreUsuario: ['', [Validators.required, this.noWhitespaceValidator]],
      Nombre: ['', [Validators.required, this.noWhitespaceValidator]],
      Apellido: ['', [Validators.required, this.noWhitespaceValidator]],
      CorreoElectronico: ['', [Validators.required, Validators.email]],
      Contraseña: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/)]],
      FechaNacimiento: ['', [Validators.required, this.dateNotInFutureValidator]],
      Intolerancias: [[], Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      this.showErrors();
      return;
    }
    const formValues = this.registroForm.value;
    console.log('Form Values:', formValues);

    /*this.http.get('http://localhost:8080/api/clientes').subscribe(data => {
      console.log(data);
    })*/
    // TODO envío del formulario a backend
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
    const isValid = selectedDate <= currentDate;
    return isValid ? null : { dateNotInFuture: true };
  }
}

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
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive, InicioComponent, BienvenidaComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.loginForm = this.fb.group({
      UserName: ['', [Validators.required, this.noWhitespaceValidator]],
      Password: ['', [Validators.required, this.noWhitespaceValidator]]
    });
  }
  onSubmit() {
    const usernameElement = document.getElementById('username') as HTMLInputElement;
    const username = usernameElement.value;

    const paswordElement = document.getElementById('password') as HTMLInputElement;
    const password = paswordElement.value;

    const user = {
      "username":username,
      "password":password
    }

    this.http.post('http://localhost:8080/api/login', user ).subscribe(data => {
      if(data){
        this.cookieService.set('usuario', username)
        this.router.navigate(['/inicio']);
      } else {
        alert('El usuario o la contraseña no son validos');
      }
    });
  }

  private noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}


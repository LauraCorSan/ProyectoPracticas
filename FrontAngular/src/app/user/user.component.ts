import { Alergens } from './../user.model';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import { InicioComponent } from '../inicio/inicio.component';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive, InicioComponent, CabeceraComponent, CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  aler = new Alergens(1, "Eggs");
  user = new User(
    'Jane',
    'Smith',
    'jane@example.com',
    'JaneS123',
    'passw0rd?',
    new Date(),
    new Date(),
    [this.aler]
  );

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  ngOnInit() {
    if (this.cookieService.get('usuario') == null || this.cookieService.get('usuario') == '') {
      this.router.navigate(['/bienvenida']);
    }

    const username = {
      username: this.cookieService.get('usuario')
    };

    this.http.post<User>('http://localhost:8080/api/user', username).subscribe((data) => {
      this.user = data;
    });
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.http.post('http://localhost:8080/api/update', this.user).subscribe((data) => {
        alert('User updated successfully!');
        window.location.reload();
      });
    } else {
      alert('Please fill out all fields before submitting.');
    }
  }

  onCancel() {
    window.location.reload();
  }

  isFormValid(): boolean {
    return (
      this.user.name.trim() !== '' &&
      this.user.surname.trim() !== '' &&
      this.user.email.trim() !== '' &&
      this.user.password.trim() !== '' &&
      this.user.dateOfBirth != null &&
      this.user.alergens.length > 0
    );
  }

  get allergenString(): string {
    return this.user.alergens.map(a => a.name).join(', ');
  }

}

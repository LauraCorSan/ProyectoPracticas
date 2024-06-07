import { Alergen } from './../user.model';
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
import { BienvenidaComponent } from '../bienvenida/bienvenida.component';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive, InicioComponent, CabeceraComponent, BienvenidaComponent, CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  aler = new Alergen("Eggs");
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

    this.http.get('http://localhost:8080/aler/alergenos').subscribe(data => {
      if(data){
        if (Array.isArray(data) && data.length > 0) {
          this.insertIntolerances(data);
        }
      }
    });
  }

  onSubmit() {
    if (this.isFormValid()) {
      const selectElement = document.getElementById('modifyAlergens') as HTMLSelectElement;
      this.user.alergens = this.parseIntolerances(selectElement);

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

  deleteCookie(){
    this.cookieService.delete('usuario');
    this.router.navigate(['/bienvenida']);
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

  insertIntolerances(alergenos: any[]) {
    const selectElement = document.getElementById('modifyAlergens') as HTMLSelectElement;
    alergenos.forEach(alergeno => {
      const option = document.createElement('option');
      option.value = alergeno.name;
      option.text = alergeno.name;
      selectElement.add(option);
    });
  }

  private parseIntolerances(listIntolerances: HTMLSelectElement): Alergen[] {
    const selectedOptions = Array.from(listIntolerances.selectedOptions);
    const intolerances = selectedOptions.map(option => new Alergen(option.textContent || ''));
    return intolerances.length > 0 ? intolerances : [];
  }

  get allergenString(): string {
    return this.user.alergens.map(a => a.name).join(', ');
  }

}

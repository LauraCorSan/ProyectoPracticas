import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserComponent } from './user.component';
import { User } from '../user.model'; // Importar la clase User
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [HttpClient] // Asegúrate de proporcionar HttpClient si lo usas en UserComponent
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit user data', () => {
    const dummyUserData: User = {
      userName: 'JaneS123',
      name: 'Jane',
      surname: 'Smith',
      email: 'jane@example.com',
      intolerances: ['Nuts']
    };

    // Simulamos que se envía el formulario
    component.onSubmit();

    // Verificamos que se haya realizado una solicitud HTTP GET a la URL esperada
    const req = httpMock.expectOne('http://localhost:8080/api/clientes');
    expect(req.request.method).toBe('GET');

    // Respondemos con los datos de usuario simulados
    req.flush(dummyUserData);

    // Verificamos que los datos del usuario se hayan actualizado correctamente
    expect(component.user).toEqual(jasmine.objectContaining(dummyUserData)); // Usar jasmine.objectContaining para comparar objetos
  });
});

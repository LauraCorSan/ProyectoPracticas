import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistroComponent } from './registro.component';
import { ActivatedRoute } from '@angular/router';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map().set('id', '123')
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Spy on window.alert
    spyOn(window, 'alert');
  });

  it('should show an alert for future date of birth', fakeAsync(() => {
    component.registroForm.controls['Username'].setValue('usuario123');
    component.registroForm.controls['Name'].setValue('Nombre');
    component.registroForm.controls['Surname'].setValue('Apellido');
    component.registroForm.controls['Email'].setValue('correo@example.com');
    component.registroForm.controls['Password'].setValue('Valid123!');
    component.registroForm.controls['BirthDate'].setValue('2050-01-01');
    component.onSubmit();
    tick();
    expect(window.alert).toHaveBeenCalledWith('The birth date must be before the current date.');
  }));

  it('should show an alert for invalid password pattern', fakeAsync(() => {
    component.registroForm.controls['Username'].setValue('usuario123');
    component.registroForm.controls['Name'].setValue('Nombre');
    component.registroForm.controls['Surname'].setValue('Apellido');
    component.registroForm.controls['Email'].setValue('correo@example.com');
    component.registroForm.controls['BirthDate'].setValue('2000-01-01');
    component.registroForm.controls['Password'].setValue('invalidpassword');
    component.onSubmit();
    tick();
    expect(window.alert).toHaveBeenCalledWith('The password must contain 8-15 characters, at least one uppercase letter, one lowercase letter, one number, and one special character ($@$!%*?&), without blank spaces.');
  }));

  it('should show an alert for invalid email', fakeAsync(() => {
    component.registroForm.controls['Username'].setValue('usuario123');
    component.registroForm.controls['Name'].setValue('Nombre');
    component.registroForm.controls['Surname'].setValue('Apellido');
    component.registroForm.controls['Password'].setValue('password');
    component.registroForm.controls['BirthDate'].setValue('2000-01-01');
    component.registroForm.controls['Email'].setValue('invalidemail');
    component.onSubmit();
    tick();
    expect(window.alert).toHaveBeenCalledWith('Use a valid email address.');
  }));

  it('should show an alert for required fields', fakeAsync(() => {
 
    component.onSubmit();
    tick();
    expect(window.alert).toHaveBeenCalledWith('The field "Username" is empty');
    // Add expectations for other required fields
  }));

  it('should have a valid form when all fields are filled correctly', () => {
    component.registroForm.controls['Username'].setValue('johndoe');
    component.registroForm.controls['Name'].setValue('John');
    component.registroForm.controls['Surname'].setValue('Doe');
    component.registroForm.controls['Email'].setValue('john.doe@example.com');
    component.registroForm.controls['Password'].setValue('Valid123!');
    component.registroForm.controls['BirthDate'].setValue('1990-01-01');
    component.registroForm.controls['Intolerances'].setValue(['lactose', 'gluten']); 

    expect(component.registroForm.valid).toBeTruthy();
  });
});

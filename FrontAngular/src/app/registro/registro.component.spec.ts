import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [RegistroComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.registroForm.setValue({
      NombreUsuario: 'usuario123',
      Nombre: 'Nombre',
      Apellido: 'Apellido',
      CorreoElectronico: 'correo@example.com',
      Contraseña: 'Password1!',
      FechaNacimiento: '2000-01-01',
      Intolerancias: []
    });
    expect(component.registroForm.valid).toBeTrue();
  });

  it('should have an invalid form when fields are empty', () => {
    component.registroForm.setValue({
      NombreUsuario: '',
      Nombre: '',
      Apellido: '',
      CorreoElectronico: '',
      Contraseña: '',
      FechaNacimiento: '',
      Intolerancias: []
    });
    expect(component.registroForm.valid).toBeFalse();
  });

  it('should show error when NombreUsuario contains only whitespaces', () => {
    component.registroForm.controls['NombreUsuario'].setValue('   ');
    expect(component.registroForm.controls['NombreUsuario'].valid).toBeFalse();
  });

  it('should show error when CorreoElectronico is invalid', () => {
    component.registroForm.controls['CorreoElectronico'].setValue('invalid-email');
    expect(component.registroForm.controls['CorreoElectronico'].valid).toBeFalse();
  });

  it('should show error when Contraseña does not meet criteria', () => {
    component.registroForm.controls['Contraseña'].setValue('password');
    expect(component.registroForm.controls['Contraseña'].valid).toBeFalse();
  });

  it('should show error when FechaNacimiento is in the future', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // Tomorrow's date
    component.registroForm.controls['FechaNacimiento'].setValue(futureDate.toISOString().split('T')[0]);
    expect(component.registroForm.controls['FechaNacimiento'].valid).toBeFalse();
  });

  it('should call onSubmit method', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should show an alert for required fields', () => {
    spyOn(window, 'alert');
    component.registroForm.controls['NombreUsuario'].setValue('');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('El campo "NombreUsuario" está vacío');
  });

  it('should show an alert for invalid email', () => {
    spyOn(window, 'alert');
    component.registroForm.controls['CorreoElectronico'].setValue('invalid-email');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Use una dirección de correo electrónico válida');
  });

  it('should show an alert for invalid password pattern', () => {
    spyOn(window, 'alert');
    component.registroForm.controls['Contraseña'].setValue('password');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('La contraseña debe contener 8-15 caracteres y al menos una letra mayúscula, una minúscula, un número y un carácter especial ($@$!%*?&) sin espacios');
  });

  it('should show an alert for future date of birth', () => {
    spyOn(window, 'alert');
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // Tomorrow's date
    component.registroForm.controls['FechaNacimiento'].setValue(futureDate.toISOString().split('T')[0]);
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('La fecha de nacimiento no puede ser en el futuro');
  });
});

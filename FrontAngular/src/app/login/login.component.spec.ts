import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/inicio" when submitting valid credentials', () => {
    spyOn(component['router'], 'navigate');
  
    component.onSubmit();
  
    expect(component['router'].navigate).toHaveBeenCalledWith(['/inicio']);
  });
  

  it('should display an alert when submitting invalid credentials', () => {
    spyOn(window, 'alert');

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('El usuario o la contraseña no son válidos');
  });
});

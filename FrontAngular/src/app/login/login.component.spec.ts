import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component'; // Importa el componente LoginComponent
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from '../cookie.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Quita LoginComponent de aquí y agrega ReactiveFormsModule, HttpClientTestingModule, y RouterTestingModule
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [CookieService]
    }).compileComponents();
    
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm', () => {
    expect(component.loginForm).toBeDefined();
    // Add more expectations as needed
  });

  it('should submit form', () => {
    const spyRouterNavigate = spyOn((component as any).router, 'navigate').and.stub();

    // Simulate form submission
    component.onSubmit();

    const req = httpTestingController.expectOne('http://localhost:8080/api/login');
    expect(req.request.method).toBe('POST');

    // Respond with mock data
    req.flush({}); // Assuming your API returns an empty object on success

    // Check if router navigate was called
    expect(spyRouterNavigate).toHaveBeenCalledWith(['/inicio']);
  });

  // Add more tests as needed
});

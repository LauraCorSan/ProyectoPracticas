import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BienvenidaComponent } from './bienvenida.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BienvenidaComponent', () => {
  let component: BienvenidaComponent;
  let fixture: ComponentFixture<BienvenidaComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        // Remove BienvenidaComponent from here
      ],
      declarations: [BienvenidaComponent], // Declare the component here
      schemas: [NO_ERRORS_SCHEMA] // Ignore any template errors
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenidaComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should navigate to "/login" when "Inicia Sesión" button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const button = fixture.nativeElement.querySelector('.button');
    button.click();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
    
  it('should navigate to "/registro" when "Regístrate" link is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const link = fixture.nativeElement.querySelector('.link');
    link.click();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/registro']);
  });
});

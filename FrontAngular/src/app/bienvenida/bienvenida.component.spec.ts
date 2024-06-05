import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BienvenidaComponent } from './bienvenida.component';

describe('BienvenidaComponent', () => {
  let component: BienvenidaComponent;
  let fixture: ComponentFixture<BienvenidaComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])], // Asegúrate de que estás utilizando RouterTestingModule.withRoutes([])
      // No declares aquí el componente BienvenidaComponent
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

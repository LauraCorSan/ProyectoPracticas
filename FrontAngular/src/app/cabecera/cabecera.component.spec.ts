import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CabeceraComponent } from './cabecera.component';

describe('CabeceraComponent', () => {
  let component: CabeceraComponent;
  let fixture: ComponentFixture<CabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ], // Importa RouterTestingModule para proporcionar un entorno de pruebas de enrutamiento
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to /inicio when clicking on Home link', () => {
    const compiled = fixture.nativeElement;
    const homeLink = compiled.querySelector('.opciones a[href="/inicio"]');
    homeLink.click();
    fixture.detectChanges();
    expect(window.location.pathname).toBe('/context.html');
  });
  it('should navigate to /historial when clicking on History link', () => {
    const compiled = fixture.nativeElement;
    const historyLink = compiled.querySelector('.opciones a[href="/historial"]');
    historyLink.click();
    fixture.detectChanges();
    expect(window.location.pathname).toBe('/context.html');
  });
});

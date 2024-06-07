import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialComponent } from './historial.component';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HistorialComponent', () => {
  let component: HistorialComponent;
  let fixture: ComponentFixture<HistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabeceraComponent], // Importa los módulos o componentes necesarios
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({}),
            snapshot: {
              paramMap: {
                get: () => 'some_value'
              }
            }
          }
        }
      ],
      declarations: [] // No declares HistorialComponent aquí
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Aquí puedes agregar más pruebas según tus necesidades
});

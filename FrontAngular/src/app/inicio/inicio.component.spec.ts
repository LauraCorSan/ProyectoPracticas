import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioComponent } from './inicio.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map().set('id', '1') // Mock the paramMap or any other property you may be using
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

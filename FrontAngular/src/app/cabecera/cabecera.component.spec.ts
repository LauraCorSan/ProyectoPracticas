import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CabeceraComponent } from './cabecera.component';
import { ActivatedRoute } from '@angular/router';

describe('CabeceraComponent', () => {
  let component: CabeceraComponent;
  let fixture: ComponentFixture<CabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [], // Remove CabeceraComponent from declarations and add any necessary imports
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map([['id', '123']])
            }
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

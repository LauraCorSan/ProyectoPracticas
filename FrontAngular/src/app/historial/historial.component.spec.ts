import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialComponent } from './historial.component';
import { ActivatedRoute } from '@angular/router';

describe('HistorialComponent', () => {
  let component: HistorialComponent;
  let fixture: ComponentFixture<HistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialComponent], // Import the standalone component here
      providers: [
        { provide: ActivatedRoute, useValue: {} } // Provide ActivatedRoute as needed
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

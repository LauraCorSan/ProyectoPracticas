import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BuscadorComponent } from './buscador.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('BuscadorComponent', () => {
  let component: BuscadorComponent;
  let fixture: ComponentFixture<BuscadorComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BuscadorComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    const req = httpMock.expectOne('http://localhost:8080/cuisine/getAll');
    req.flush([]);
    expect(component).toBeTruthy();
  });

  it('should populate types dropdown with data from API', () => {
    const mockData = [{ type: 'Type1' }, { type: 'Type2' }];
    const req = httpMock.expectOne('http://localhost:8080/cuisine/getAll');
    req.flush(mockData);
    fixture.detectChanges();

    const selectElement = fixture.debugElement.query(By.css('#type')).nativeElement;
    expect(selectElement.options.length).toBe(mockData.length);
    expect(selectElement.options[0].value).toBe(mockData[0].type);
    expect(selectElement.options[1].value).toBe(mockData[1].type);
  });

  it('should validate fields correctly', () => {
    const req = httpMock.expectOne('http://localhost:8080/cuisine/getAll');
    req.flush([]);
    fixture.detectChanges();

    const nameField = fixture.debugElement.query(By.css('#name')).nativeElement;

    // Test empty name field
    nameField.value = '';
    nameField.dispatchEvent(new Event('input'));
    expect(component.validateFields()).toBe(false);

    // Test valid name field
    nameField.value = 'Test Recipe';
    nameField.dispatchEvent(new Event('input'));
    expect(component.validateFields()).toBe(true);
  });

  // Add more tests for other functionalities...
});

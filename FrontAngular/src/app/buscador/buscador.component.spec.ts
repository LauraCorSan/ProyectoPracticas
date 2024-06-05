import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BuscadorComponent } from './buscador.component';

describe('BuscadorComponent', () => {
  let component: BuscadorComponent;
  let fixture: ComponentFixture<BuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [] // Elimina la declaración de BuscadorComponent aquí
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should validate empty fields correctly', () => {
    spyOn(window, 'alert'); // Mock alert function
  
    // Test empty fields
    component.validateFields();
    expect(window.alert).toHaveBeenCalledTimes(6); // Six alerts for empty fields
  });
  
  it('should validate filled fields correctly', () => {
    spyOn(window, 'alert'); // Mock alert function
  
    // Set values for filled fields
    component.recipeName = 'Pasta';
    component.recipeType = 'African';
    component.maxCalories = 500;
    component.minCalories = 200;
    component.ingredients = 'Pasta, Tomato sauce, Ground beef';
  
    // Test filled fields
    component.validateFields();
    expect(window.alert).not.toHaveBeenCalled(); // No alerts for filled fields
  });
  
  it('should validate empty fields correctly', () => {
    spyOn(window, 'alert'); // Mock alert function
  
    // Test empty fields
    component.validateFields();
    expect(window.alert).toHaveBeenCalledTimes(6); // Six alerts for empty fields
  });
  
  it('should validate filled fields correctly', () => {
    spyOn(window, 'alert'); // Mock alert function
  
    // Set values for filled fields
    component.recipeName = 'Pasta';
    component.recipeType = 'African';
    component.maxCalories = 500;
    component.minCalories = 200;
    component.ingredients = 'Pasta, Tomato sauce, Ground beef';
  
    // Test filled fields
    component.validateFields();
    expect(window.alert).not.toHaveBeenCalled(); // No alerts for filled fields
  });
  
  it('should check if a string is filled', () => {
    expect(component.isFilled('', 'Test Field')).toBeFalse(); // Empty string
    expect(component.isFilled('Test', 'Test Field')).toBeTrue(); // Filled string
  });

  it('should check if a string contains a single word', () => {
    expect(component.isSingleWord('')).toBeFalse(); // Empty string
    expect(component.isSingleWord('Test Test')).toBeFalse(); // Multiple words
    expect(component.isSingleWord('Test')).toBeTrue(); // Single word
  });
});

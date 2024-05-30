import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';
import { AppComponent } from '../app.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'InstanteRecipes' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('InstantRecipes');
  });

  describe('createUser', () => {
    let userNameElement: HTMLInputElement;
    let nameElement: HTMLInputElement;
    let surnameElement: HTMLInputElement;
    let emailElement: HTMLInputElement;
    let intolerancesElement: HTMLSelectElement;
    let passwordElement: HTMLInputElement;

    beforeEach(() => {
      userNameElement = document.createElement('input');
      userNameElement.id = 'user';
      nameElement = document.createElement('input');
      nameElement.id = 'name';
      surnameElement = document.createElement('input');
      surnameElement.id = 'surname';
      emailElement = document.createElement('input');
      emailElement.id = 'email';
      intolerancesElement = document.createElement('select');
      intolerancesElement.id = 'intolerances';
      passwordElement = document.createElement('input');
      passwordElement.id = 'pass';

      document.body.appendChild(userNameElement);
      document.body.appendChild(nameElement);
      document.body.appendChild(surnameElement);
      document.body.appendChild(emailElement);
      document.body.appendChild(intolerancesElement);
      document.body.appendChild(passwordElement);
    });

    afterEach(() => {
      document.body.removeChild(userNameElement);
      document.body.removeChild(nameElement);
      document.body.removeChild(surnameElement);
      document.body.removeChild(emailElement);
      document.body.removeChild(intolerancesElement);
      document.body.removeChild(passwordElement);
    });

    it('should return false if any field is empty', () => {
      userNameElement.value = '';
      expect(component.createUser()).toBeFalse();
    });

    it('should return false if email is invalid', () => {
      userNameElement.value = 'username';
      nameElement.value = 'name';
      surnameElement.value = 'surname';
      emailElement.value = 'invalidEmail';
      expect(component.createUser()).toBeFalse();
    });

    it('should return false if password is invalid', () => {
      userNameElement.value = 'username';
      nameElement.value = 'name';
      surnameElement.value = 'surname';
      emailElement.value = 'test@example.com';
      passwordElement.value = 'weakpass';
      expect(component.createUser()).toBeFalse();
    });

    it('should return false if no intolerances are selected', () => {
      userNameElement.value = 'username';
      nameElement.value = 'name';
      surnameElement.value = 'surname';
      emailElement.value = 'test@example.com';
      passwordElement.value = 'StrongPass1!';
      expect(component.createUser()).toBeFalse();
    });

    it('should return true if all fields are valid', () => {
      userNameElement.value = 'username';
      nameElement.value = 'name';
      surnameElement.value = 'surname';
      emailElement.value = 'test@example.com';
      passwordElement.value = 'StrongPass1!';
      let option = document.createElement('option');
      option.selected = true;
      intolerancesElement.appendChild(option);
      expect(component.createUser()).toBeTrue();
    });
  });

});

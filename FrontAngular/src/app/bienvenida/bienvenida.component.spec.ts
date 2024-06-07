import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BienvenidaComponent } from './bienvenida.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('BienvenidaComponent', () => {
  let component: BienvenidaComponent;
  let fixture: ComponentFixture<BienvenidaComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ BienvenidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenidaComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login when login button is clicked', () => {
    const loginButton = fixture.debugElement.query(By.css('.button[href="/login"]'));
    const navigateSpy = spyOn(router, 'navigateByUrl');

    loginButton.nativeElement.click();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith('/login');
  });

  it('should navigate to register when register button is clicked', () => {
    const registerButton = fixture.debugElement.query(By.css('.link[href="/registro"]'));
    const navigateSpy = spyOn(router, 'navigateByUrl');

    registerButton.nativeElement.click();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith('/registro');
  });
});

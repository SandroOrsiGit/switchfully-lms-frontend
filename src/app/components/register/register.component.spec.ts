import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Import HttpClientTestingModule
import { UserService } from '../../services/user.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [UserService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form if email is not provided', () => {
    component.email.setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should have an invalid form if email is not a valid email', () => {
    component.email.setValue('invalid-email');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should have an invalid form if display name is not provided', () => {
    component.displayName.setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should have an invalid form if password is not provided', () => {
    component.password.setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should have an invalid form if passwordConfirm is not provided', () => {
    component.passwordConfirm.setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should have an invalid form if passwords do not match', () => {
    component.password.setValue('password1');
    component.passwordConfirm.setValue('password2');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should have a valid form if all fields are filled correctly', () => {
    component.email.setValue('test@example.com');
    component.displayName.setValue('Test User');
    component.password.setValue('password');
    component.passwordConfirm.setValue('password');
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('should call register method on form submission', () => {
    spyOn(component, 'register');

    component.email.setValue('test@example.com');
    component.displayName.setValue('Test User');
    component.password.setValue('password');
    component.passwordConfirm.setValue('password');

    component.registerForm.updateValueAndValidity();
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('ngSubmit'));
    
    expect(component.register).toHaveBeenCalled();
  });

});

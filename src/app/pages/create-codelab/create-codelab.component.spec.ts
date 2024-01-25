import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCodelabComponent } from './create-codelab.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { throwError } from 'rxjs/internal/observable/throwError';

describe('CreateCodelabComponent', () => {
  let component: CreateCodelabComponent;
  let fixture: ComponentFixture<CreateCodelabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCodelabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a mat-card with app-create-codelab-form', () => {
    const cardElement = fixture.nativeElement.querySelector('mat-card');
    const formElement = fixture.nativeElement.querySelector('app-create-codelab-form');

    expect(cardElement).toBeTruthy();
    expect(formElement).toBeTruthy();
  });

  it('should bind the onCreate event to app-create-codelab-form', () => {
    const formElement = fixture.nativeElement.querySelector('form');
  
    spyOn(component, 'onCreate');
  
    formElement.dispatchEvent(new Event('ngSubmit'));
  
    expect(component.onCreate).toHaveBeenCalled();
  });

  it('should render the CreateCodelabComponent with the correct title', () => {
    const titleElement = fixture.nativeElement.querySelector('h1');
  
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Create codelab');
  });

  it('should have injected services and dependencies', () => {
    expect(component.router).toBeTruthy();
    expect(component._snackBar).toBeTruthy();
    expect(component.codelabService).toBeTruthy();
  });

  it('should contain the app-create-codelab-form component', () => {
    const formComponent = fixture.nativeElement.querySelector('app-create-codelab-form');
  
    expect(formComponent).toBeTruthy();
  });

});

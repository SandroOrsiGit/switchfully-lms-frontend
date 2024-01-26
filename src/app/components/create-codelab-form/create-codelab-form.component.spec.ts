import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateCodelabFormComponent } from './create-codelab-form.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateCodelabFormComponent', () => {
  let component: CreateCodelabFormComponent;
  let fixture: ComponentFixture<CreateCodelabFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCodelabFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onSubmit event with correct value on form submission', () => {
    const emitSpy = spyOn(component.onSubmit, 'emit');

    component.name.setValue('ValidName');

    component.onCreate();

    expect(emitSpy).toHaveBeenCalledWith({ name: 'ValidName' });
  });

});

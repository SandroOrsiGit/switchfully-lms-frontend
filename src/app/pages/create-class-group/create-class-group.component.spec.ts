import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassGroupComponent } from './create-class-group.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateClassGroupComponent', () => {
  let component: CreateClassGroupComponent;
  let fixture: ComponentFixture<CreateClassGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateClassGroupComponent,
        HttpClientTestingModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClassGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form if end date comes before start date', () => {
    component.createClassGroupForm.get('endDate')?.setValue(new Date("2024-01-01"));
    component.createClassGroupForm.get('startDate')?.setValue(new Date("2024-01-02"));

    expect(component.createClassGroupForm.valid).toBeFalsy();
  })

  it('should have an invalid form if the class group name is not set', () => {
    component.createClassGroupForm.get('name')?.setValue("")

    expect(component.createClassGroupForm.valid).toBeFalsy();
  })
});

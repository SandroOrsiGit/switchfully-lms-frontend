import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassGroupComponent } from './create-class-group.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CreateClassGroupComponent', () => {
  let component: CreateClassGroupComponent;
  let fixture: ComponentFixture<CreateClassGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateClassGroupComponent,
        HttpClientTestingModule,
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
});

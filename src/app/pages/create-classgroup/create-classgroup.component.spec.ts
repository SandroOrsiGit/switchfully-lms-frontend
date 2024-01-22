import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassgroupComponent } from './create-classgroup.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CreateClassgroupComponent', () => {
  let component: CreateClassgroupComponent;
  let fixture: ComponentFixture<CreateClassgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateClassgroupComponent,
        HttpClientTestingModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClassgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { CreateModuleFormComponent } from './create-module-form.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CreateModuleFormComponent', () => {
  let component: CreateModuleFormComponent;
  let fixture: ComponentFixture<CreateModuleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModuleFormComponent, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateModuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

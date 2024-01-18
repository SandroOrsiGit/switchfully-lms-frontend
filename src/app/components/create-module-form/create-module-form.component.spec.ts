import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModuleFormComponent } from './create-module-form.component';

describe('CreateModuleFormComponent', () => {
  let component: CreateModuleFormComponent;
  let fixture: ComponentFixture<CreateModuleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModuleFormComponent]
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

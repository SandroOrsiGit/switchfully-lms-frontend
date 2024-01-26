import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCodelabComponent } from './create-codelab.component';

describe('CreateCodelabComponent', () => {
  let component: CreateCodelabComponent;
  let fixture: ComponentFixture<CreateCodelabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCodelabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCodelabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

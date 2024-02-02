import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCodelabComponent } from './update-codelab.component';

describe('UpdateCodelabComponent', () => {
  let component: UpdateCodelabComponent;
  let fixture: ComponentFixture<UpdateCodelabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCodelabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCodelabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelabDetailComponent } from './codelab-detail.component';

describe('CodelabDetailComponent', () => {
  let component: CodelabDetailComponent;
  let fixture: ComponentFixture<CodelabDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodelabDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodelabDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

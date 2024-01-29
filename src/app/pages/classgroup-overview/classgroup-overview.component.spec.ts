import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassgroupOverviewComponent } from './classgroup-overview.component';

describe('ClassgroupOverviewComponent', () => {
  let component: ClassgroupOverviewComponent;
  let fixture: ComponentFixture<ClassgroupOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassgroupOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassgroupOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

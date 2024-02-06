import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassGroupOverviewComponent } from './class-group-overview.component';

describe('ClassgroupOverviewComponent', () => {
  let component: ClassGroupOverviewComponent;
  let fixture: ComponentFixture<ClassGroupOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassGroupOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassGroupOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

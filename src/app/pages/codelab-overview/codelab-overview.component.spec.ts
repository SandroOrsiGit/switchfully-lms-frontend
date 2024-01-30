import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelabOverviewComponent } from './codelab-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CodelabComponent', () => {
  let component: CodelabOverviewComponent;
  let fixture: ComponentFixture<CodelabOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CodelabOverviewComponent,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodelabOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

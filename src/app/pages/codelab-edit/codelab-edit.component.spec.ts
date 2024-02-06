import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelabEditComponent } from './codelab-edit.component';

describe('UpdateCodelabComponent', () => {
  let component: CodelabEditComponent;
  let fixture: ComponentFixture<CodelabEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodelabEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodelabEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

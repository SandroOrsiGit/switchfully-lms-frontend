import { TestBed } from '@angular/core/testing';

import { CodelabService } from '../codelab.service';

describe('CodelabService', () => {
  let service: CodelabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodelabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

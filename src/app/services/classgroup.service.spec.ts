import { TestBed } from '@angular/core/testing';

import { ClassgroupService } from './classgroup.service';

describe('ClassgroupService', () => {
  let service: ClassgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RoleGuardService } from '../auth-guard.service';

describe('RoleGuardService', () => {
  let service: RoleGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

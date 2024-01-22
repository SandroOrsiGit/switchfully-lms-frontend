import { TestBed } from '@angular/core/testing';

import { ModuleService } from './module.service';

describe('ModuleService', () => {
  let service: ModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModuleService
      ]
    });
    service = TestBed.inject(ModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

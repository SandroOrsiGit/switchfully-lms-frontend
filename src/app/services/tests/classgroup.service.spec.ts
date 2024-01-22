import { TestBed } from '@angular/core/testing';

import { ClassgroupService } from '../classgroup.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ClassgroupService', () => {
  let service: ClassgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ClassgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

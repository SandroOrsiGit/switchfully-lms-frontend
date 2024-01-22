import { TestBed } from '@angular/core/testing';

import { ClassGroupService } from '../class-group.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ClassGroupService', () => {
  let service: ClassGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ClassGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

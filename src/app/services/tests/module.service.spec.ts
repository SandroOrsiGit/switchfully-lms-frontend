import { TestBed } from '@angular/core/testing';

import { ModuleService } from '../module.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ModuleService', () => {
  let service: ModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModuleService,
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(ModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

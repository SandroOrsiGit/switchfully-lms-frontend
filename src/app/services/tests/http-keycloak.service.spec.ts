import { TestBed } from '@angular/core/testing';

import { HttpKeycloakService } from '../http-keycloak.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('HttpKeycloakService', () => {
  let service: HttpKeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(HttpKeycloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

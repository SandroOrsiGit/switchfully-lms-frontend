import { TestBed } from '@angular/core/testing';

import { KeycloakService } from '../keycloak.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('KeycloakService', () => {
  let service: KeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(KeycloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

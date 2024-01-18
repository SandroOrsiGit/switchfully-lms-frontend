import { TestBed } from '@angular/core/testing';

import { HttpKeycloakService } from './http-keycloak.service';

describe('HttpKeycloakService', () => {
  let service: HttpKeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpKeycloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

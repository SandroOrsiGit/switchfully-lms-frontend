import { TestBed } from '@angular/core/testing';

import { UserService } from '../user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment.dev';
import {User} from '../../models/User';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request to get a user by token', () => {
    service.getUserByToken().subscribe();

    const req = httpTestingController.expectOne(`${environment.backendUrl}/user`);
    expect(req.request.method).toEqual('GET');

    req.flush({});
  });

  it('should set and get the current user', () => {
    const dummyUser: User = { id: 123, email: "test@test.test", displayName: "test", classes: [] };

    service.setCurrentUser(dummyUser);

    const currentUser = service.getCurrentUser();

    expect(currentUser).toEqual(dummyUser);
  });


});

import {TestBed} from '@angular/core/testing';

import {ClassGroupService} from '../class-group.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CreateClassGroupDto} from '../../dtos/CreateClassGroupDto';
import {environment} from '../../../environments/environment.development';

describe('ClassGroupService', () => {
  let service: ClassGroupService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClassGroupService]
    });
    service = TestBed.inject(ClassGroupService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding HTTP requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a class group', () => {
    const newClassGroup: CreateClassGroupDto = {
      name: 'testGroup',
      startDate: new Date(2024, 1, 23),
      endDate: new Date(2024, 2, 23)
    };

    service.createClassGroup(newClassGroup).subscribe();

    const req = httpTestingController.expectOne(`${environment.backendUrl}/class-groups`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newClassGroup);

    req.flush(newClassGroup);
  });

  it('should send a GET request to get class groups by user ID', () => {
    const userId = 123;

    service.getClassGroupsByUserId(userId).subscribe();

    const req = httpTestingController.expectOne(`${environment.backendUrl}/class-groups?studentId=${userId}`);
    expect(req.request.method).toEqual('GET');

    req.flush([]);
  });
});

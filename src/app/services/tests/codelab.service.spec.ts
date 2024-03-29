import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CodelabService } from '../codelab.service';
import { CreateCodelabDto } from '../../dtos/CreateCodelabDto';
import { environment } from '../../../environments/environment';
import { CodelabDto } from '../../dtos/CodelabDto';

describe('CodelabService', () => {
  let service: CodelabService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CodelabService],
    });

    service = TestBed.inject(CodelabService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a codelab', () => {
    const createCodelabDto: CreateCodelabDto = {
      name: 'testCodelab',
      moduleId: 1
    };
    const expectedUrl = `${environment.backendUrl}/codelab`;

    service.createCodelab(createCodelabDto).subscribe((result: CodelabDto) => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
  });

  it('should handle errors during codelab creation', () => {
    const createCodelabDto: CreateCodelabDto = {
      name: 'testCodelab',
      moduleId: 1
    };
    const expectedUrl = `${environment.backendUrl}/codelab`;

    service.createCodelab(createCodelabDto).subscribe(
      () => {
        fail('Should not succeed');
      },
      (error: any) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Error'));
  });

});

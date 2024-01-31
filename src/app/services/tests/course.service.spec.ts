import { TestBed } from '@angular/core/testing';

import { CourseService } from '../course.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

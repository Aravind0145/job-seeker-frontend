import { TestBed } from '@angular/core/testing';

import { JobseekerSharedService } from './jobseeker-shared.service';

describe('JobseekerSharedService', () => {
  let service: JobseekerSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobseekerSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

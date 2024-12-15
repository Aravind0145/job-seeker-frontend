import { TestBed } from '@angular/core/testing';

import { EmployeeserviceService } from './jobseeker/employeeservice.service';

describe('EmployeeserviceService', () => {
  let service: EmployeeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

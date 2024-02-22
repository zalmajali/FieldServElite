import { TestBed } from '@angular/core/testing';

import { InspectionpointsService } from './inspectionpoints.service';

describe('InspectionpointsService', () => {
  let service: InspectionpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectionpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

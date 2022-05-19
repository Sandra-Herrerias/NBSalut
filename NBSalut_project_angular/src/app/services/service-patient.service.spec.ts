import { TestBed } from '@angular/core/testing';

import { ServicePatientService } from './service-patient.service';

describe('ServicePatientService', () => {
  let service: ServicePatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

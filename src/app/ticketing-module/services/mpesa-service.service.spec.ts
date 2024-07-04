import { TestBed } from '@angular/core/testing';

import { MpesaServiceService } from './mpesa-service.service';

describe('MpesaServiceService', () => {
  let service: MpesaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpesaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

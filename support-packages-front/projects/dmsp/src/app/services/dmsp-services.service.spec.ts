import { TestBed } from '@angular/core/testing';

import { DmspServicesService } from './dmsp-services.service';

describe('DmspServicesService', () => {
  let service: DmspServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmspServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

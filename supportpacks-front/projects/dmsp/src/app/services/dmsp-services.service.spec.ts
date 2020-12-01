import { TestBed } from '@angular/core/testing';

import { DmspServicesService } from './dmsp-services.service';

describe('DmspServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DmspServicesService = TestBed.get(DmspServicesService);
    expect(service).toBeTruthy();
  });
});

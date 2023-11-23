import { TestBed } from '@angular/core/testing';

import { ServicesMelService } from './services-mel.service';

describe('ServicesMelService', () => {
  let service: ServicesMelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesMelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

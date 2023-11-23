import { TestBed } from '@angular/core/testing';

import { ServicedmspService } from './servicedmsp.service';

describe('ServicedmspService', () => {
  let service: ServicedmspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicedmspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

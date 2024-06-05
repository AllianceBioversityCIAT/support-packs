import { TestBed } from '@angular/core/testing';

import { ServicedmspService } from './servicedmsp.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServicedmspService', () => {
  let service: ServicedmspService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ServicedmspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

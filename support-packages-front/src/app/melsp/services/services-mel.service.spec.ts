import { TestBed } from '@angular/core/testing';

import { ServicesMelService } from './services-mel.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServicesMelService', () => {
  let service: ServicesMelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ServicesMelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

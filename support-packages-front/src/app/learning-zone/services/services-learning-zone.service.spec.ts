import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ServicesLearningZoneService } from './services-learning-zone.service';

describe('ServicesLearningZoneService', () => {
  let service: ServicesLearningZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ServicesLearningZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

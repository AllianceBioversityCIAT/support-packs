import { TestBed } from '@angular/core/testing';

import { ServicesTermsService } from './services-terms.service';

describe('ServicesTermsService', () => {
  let service: ServicesTermsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesTermsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

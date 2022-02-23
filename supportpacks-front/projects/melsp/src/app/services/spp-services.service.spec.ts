import { TestBed } from '@angular/core/testing';

import { SppServices } from './spp-services.service';

describe('SppServices', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SppServices = TestBed.get(SppServices);
    expect(service).toBeTruthy();
  });
});

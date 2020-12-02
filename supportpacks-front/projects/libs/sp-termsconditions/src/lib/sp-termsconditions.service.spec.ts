import { TestBed } from '@angular/core/testing';

import { SPTermsconditionsService } from './sp-termsconditions.service';

describe('SPTermsconditionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SPTermsconditionsService = TestBed.get(SPTermsconditionsService);
    expect(service).toBeTruthy();
  });
});

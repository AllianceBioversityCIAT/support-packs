import { TestBed } from '@angular/core/testing';

import { TermsconditionsService } from './termsconditions.service';

describe('TermsconditionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TermsconditionsService = TestBed.get(TermsconditionsService);
    expect(service).toBeTruthy();
  });
});

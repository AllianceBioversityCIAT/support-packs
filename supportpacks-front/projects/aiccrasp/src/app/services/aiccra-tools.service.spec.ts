import { TestBed } from '@angular/core/testing';

import { AiccraToolsService } from './aiccra-tools.service';

describe('AiccraToolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AiccraToolsService = TestBed.get(AiccraToolsService);
    expect(service).toBeTruthy();
  });
});

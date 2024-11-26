import { Test, TestingModule } from '@nestjs/testing';
import { SpAppsService } from './sp-apps.service';

describe('SpAppsService', () => {
  let service: SpAppsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpAppsService],
    }).compile();

    service = module.get<SpAppsService>(SpAppsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

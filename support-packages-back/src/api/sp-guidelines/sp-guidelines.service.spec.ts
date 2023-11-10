import { Test, TestingModule } from '@nestjs/testing';
import { SpGuidelinesService } from './sp-guidelines.service';

describe('SpGuidelinesService', () => {
  let service: SpGuidelinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpGuidelinesService],
    }).compile();

    service = module.get<SpGuidelinesService>(SpGuidelinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

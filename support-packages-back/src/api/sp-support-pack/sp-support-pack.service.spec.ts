import { Test, TestingModule } from '@nestjs/testing';
import { SpSupportPackService } from './sp-support-pack.service';

describe('SpSupportPackService', () => {
  let service: SpSupportPackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpSupportPackService],
    }).compile();

    service = module.get<SpSupportPackService>(SpSupportPackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

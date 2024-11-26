import { Test, TestingModule } from '@nestjs/testing';
import { SpCategoriesService } from './sp-categories.service';

describe('SpCategoriesService', () => {
  let service: SpCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpCategoriesService],
    }).compile();

    service = module.get<SpCategoriesService>(SpCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

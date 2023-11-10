import { Test, TestingModule } from '@nestjs/testing';
import { SpCategoriesController } from './sp-categories.controller';
import { SpCategoriesService } from './sp-categories.service';

describe('SpCategoriesController', () => {
  let controller: SpCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpCategoriesController],
      providers: [SpCategoriesService],
    }).compile();

    controller = module.get<SpCategoriesController>(SpCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

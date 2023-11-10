import { Test, TestingModule } from '@nestjs/testing';
import { SpGuidelinesController } from './sp-guidelines.controller';
import { SpGuidelinesService } from './sp-guidelines.service';

describe('SpGuidelinesController', () => {
  let controller: SpGuidelinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpGuidelinesController],
      providers: [SpGuidelinesService],
    }).compile();

    controller = module.get<SpGuidelinesController>(SpGuidelinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

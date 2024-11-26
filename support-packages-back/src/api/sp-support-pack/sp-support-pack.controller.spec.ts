import { Test, TestingModule } from '@nestjs/testing';
import { SpSupportPackController } from './sp-support-pack.controller';
import { SpSupportPackService } from './sp-support-pack.service';

describe('SpSupportPackController', () => {
  let controller: SpSupportPackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpSupportPackController],
      providers: [SpSupportPackService],
    }).compile();

    controller = module.get<SpSupportPackController>(SpSupportPackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

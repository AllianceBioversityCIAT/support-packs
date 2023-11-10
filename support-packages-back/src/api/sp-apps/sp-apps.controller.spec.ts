import { Test, TestingModule } from '@nestjs/testing';
import { SpAppsController } from './sp-apps.controller';
import { SpAppsService } from './sp-apps.service';

describe('SpAppsController', () => {
  let controller: SpAppsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpAppsController],
      providers: [SpAppsService],
    }).compile();

    controller = module.get<SpAppsController>(SpAppsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

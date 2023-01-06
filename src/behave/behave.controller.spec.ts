import { Test, TestingModule } from '@nestjs/testing';
import { BehaveController } from './behave.controller';
import { BehaveService } from './behave.service';

describe('BehaveController', () => {
  let controller: BehaveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BehaveController],
      providers: [BehaveService],
    }).compile();

    controller = module.get<BehaveController>(BehaveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

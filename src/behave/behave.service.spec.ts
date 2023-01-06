import { Test, TestingModule } from '@nestjs/testing';
import { BehaveService } from './behave.service';

describe('BehaveService', () => {
  let service: BehaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BehaveService],
    }).compile();

    service = module.get<BehaveService>(BehaveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

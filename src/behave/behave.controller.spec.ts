import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BehaveController } from './behave.controller';
import { BehaveService } from './behave.service';
import { CreateBehaveDto } from './dto/create-behave.dto';
import { Behave } from './schemas/behave.schema';

jest.mock('./behave.service');

describe('BehaveController', () => {
  let behaveController: BehaveController;
  let behaveService: BehaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [BehaveController],
      providers: [
        BehaveService,
        { provide: getModelToken(Behave.name), useValue: jest.fn() },
      ],
    }).compile();

    behaveController = module.get<BehaveController>(BehaveController);
    behaveService = module.get<BehaveService>(BehaveService);
  });

  it('should be defined', () => {
    expect(behaveController).toBeDefined();
  });

  describe('createBehave', () => {
    let createBehaveDto: CreateBehaveDto;
    let behaveObj: Behave;
    beforeEach(async () => {
      createBehaveDto = {
        name: 'unitTesting',
        points: 100,
      };
      behaveObj = await behaveController.create(createBehaveDto as any);
    });
    test('then it should call behave Service', () => {
      expect(behaveService.create).toHaveBeenCalledWith(createBehaveDto);
    });

    test('then it should return a behave', () => {
      expect(behaveObj).toEqual(createBehaveDto);
    });
  });
});

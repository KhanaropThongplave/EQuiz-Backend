import { Test, TestingModule } from '@nestjs/testing';
import { EquizTokenController } from './equiz-token.controller';

describe('EquizTokenController', () => {
  let controller: EquizTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquizTokenController],
    }).compile();

    controller = module.get<EquizTokenController>(EquizTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

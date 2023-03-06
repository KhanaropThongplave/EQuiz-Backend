import { Test, TestingModule } from '@nestjs/testing';
import { EquizTokenService } from './equiz-token.service';

describe('EquizTokenService', () => {
  let service: EquizTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquizTokenService],
    }).compile();

    service = module.get<EquizTokenService>(EquizTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

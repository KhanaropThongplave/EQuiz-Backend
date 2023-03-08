import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { EquizTokenService } from './equiz-token.service';

@Controller('/api/equiz-token')
export class EquizTokenController {
  constructor(private equizTokenService: EquizTokenService) {}

  @Post('/claim')
  async claimFunction(@Req() request: Request) {
    return await this.equizTokenService.claimContractCall(
      request.body.score,
      request.body.claim_receipt,
    );
  }
}

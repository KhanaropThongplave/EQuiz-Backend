import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EQuizToken } from 'src/entities/equiz-token';
import { EquizTokenController } from './equiz-token.controller';
import { EquizTokenService } from './equiz-token.service';

@Module({
  imports: [ConfigModule.forRoot({}), TypeOrmModule.forFeature([EQuizToken])],
  providers: [EquizTokenService],
  controllers: [EquizTokenController],
  exports: [],
})
export class EquizTokenModule {}

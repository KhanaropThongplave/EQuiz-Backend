import { Module } from '@nestjs/common';
import { EquizTokenModule } from './equiz-token/equiz-token.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({}), EquizTokenModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

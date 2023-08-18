import { BadgesController } from './badges.controller';
import { BadgesService } from './badges.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [BadgesController],
  providers: [BadgesService],
})
export class BadgesModule {}

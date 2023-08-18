import { Rank, rankSchema } from './schema/rank.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rank.name, schema: rankSchema }]),
  ],
  controllers: [RankController],
  providers: [RankService],
})
export class RankModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Featured, FeaturedSchema } from './schema/featured.schema';
import { FeaturedController } from './featured.controller';
import { FeaturedService } from './featured.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Featured.name, schema: FeaturedSchema },
    ]),
  ],
  controllers: [FeaturedController],
  providers: [FeaturedService],
})
export class FeaturedModule {}

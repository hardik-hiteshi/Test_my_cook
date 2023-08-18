import { Featured, featuredSchema } from './schema/featured.schema';
import { FeaturedController } from './featured.controller';
import { FeaturedService } from './featured.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Featured.name, schema: featuredSchema },
    ]),
  ],
  controllers: [FeaturedController],
  providers: [FeaturedService],
})
export class FeaturedModule {}

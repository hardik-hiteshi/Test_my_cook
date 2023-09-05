import {
  Advertisement,
  advertisementSchema,
} from './schemas/advertisement.schema';
import { AdvertisementController } from './advertisement.controller';
import { AdvertisementRepository } from './repository/advertisement.repository';
import { AdvertisementService } from './advertisement.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Advertisement.name, schema: advertisementSchema },
    ]),
  ],
  controllers: [AdvertisementController],
  providers: [AdvertisementService, AdvertisementRepository],
})
export class AdvertisementModule {}

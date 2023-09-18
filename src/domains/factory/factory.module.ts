import { Factory, factorySchema } from './schema/factory.schema';
import { FactoriesController } from './controller/factories.controller';
import { FactoryController } from './controller/factory.controller';
import { FactoryRepository } from './repository/factory.repository';
import { FactoryService } from './factory.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Factory.name, schema: factorySchema }]),
    FactoryModule,
  ],
  controllers: [FactoryController, FactoriesController],
  providers: [FactoryService, FactoryRepository],
})
export class FactoryModule {}

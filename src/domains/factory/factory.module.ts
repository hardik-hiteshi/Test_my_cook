import { Factory, factorySchema } from './schema/factory.schema';
import { FactoryController } from './factory.controller';
import { FactoryService } from './factory.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Factory.name, schema: factorySchema }]),
    FactoryModule,
  ],
  controllers: [FactoryController],
  providers: [FactoryService],
})
export class FactoryModule {}

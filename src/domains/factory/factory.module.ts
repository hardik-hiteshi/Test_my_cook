import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Factory, FactorySchema } from './schema/factory.schema';
import { FactoryController } from './factory.controller';
import { FactoryService } from './factory.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Factory.name, schema: FactorySchema }]),
    FactoryModule,
  ],
  controllers: [FactoryController],
  providers: [FactoryService],
})
export class FactoryModule {}

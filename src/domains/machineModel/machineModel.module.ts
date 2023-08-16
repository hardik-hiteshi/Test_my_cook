import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MachineModel, MachineModelSchema } from './schema/machineModel.schema';
import { machineModelController } from './machineModel.controller';
import { MachineModelService } from './machineModel.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MachineModel.name, schema: MachineModelSchema },
    ]),
  ],
  controllers: [machineModelController],
  providers: [MachineModelService],
})
export class MachineModelModule {}

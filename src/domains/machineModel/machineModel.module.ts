import { MachineModel, machineModelSchema } from './schema/machineModel.schema';
import { MachineModelController } from './machineModel.controller';
import { MachineModelService } from './machineModel.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MachineModel.name, schema: machineModelSchema },
    ]),
  ],
  controllers: [MachineModelController],
  providers: [MachineModelService],
})
export class MachineModelModule {}

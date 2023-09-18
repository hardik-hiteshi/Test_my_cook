import { MachineLog, machineLogSchema } from './schema/machine-log.schema';
import { MachineLogController } from './controller/machine-log.controller';
import { MachineLogRepository } from './repository/machine-log.repository';
import { MachineLogsController } from './controller/machine-logs.controller';
import { MachineLogService } from './machine-log.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MachineLog.name, schema: machineLogSchema },
    ]),
  ],
  controllers: [MachineLogController, MachineLogsController],
  providers: [MachineLogService, MachineLogRepository],
})
export class MachineLogModule {}

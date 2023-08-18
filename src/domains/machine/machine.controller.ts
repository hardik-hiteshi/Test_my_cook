import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMachineDto, UpdateMachineDto } from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { MachineDocument } from './schema/machine.schema';
import { MachineService } from './machine.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller('machine')
export class MachineController {
  public constructor(private machineService: MachineService) {}
  // @Post('import')
  // private async importMachine(): Promise<void> {}

  @Post()
  private async createMachine(
    @Body() body: CreateMachineDto,
  ): Promise<MachineDocument> {
    return await this.machineService.createOne(body);
  }

  @Get(':unique_id')
  private async getMachine(
    @Param(':unique_id') uniqueId: string,
  ): Promise<MachineDocument> {
    return await this.machineService.findOne(uniqueId);
  }

  @Get()
  private async getAllMachine(): Promise<MachineDocument[]> {
    return await this.machineService.findAll();
  }
  @Patch(':unique_id')
  private async updateMachine(
    @Param(':unique_id') uniqueId: string,
    @Body() body: UpdateMachineDto,
  ): Promise<MachineDocument> {
    return this.machineService.findOneAndUpdate(uniqueId, body);
  }

  @Delete(':unique_id')
  private async deleteMachineByUniqueId(
    @Param(':unique_id') uniqueId: string,
  ): Promise<void> {
    await this.machineService.deleteOne(uniqueId);
  }
}

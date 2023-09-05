import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateMachineDto,
  CreateManyMachineDto,
  UpdateMachineDto,
} from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CsvToJsonInterceptor } from 'src/common/interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { MachineDocument } from './schema/machine.schema';
import { MachineService } from './machine.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller('machine')
export class MachineController {
  public constructor(private machineService: MachineService) {}

  @Post()
  private async createMachine(
    @Body() body: CreateMachineDto,
    @Headers('region') region: string,
  ): Promise<MachineDocument> {
    return await this.machineService.createOne(body, region);
  }

  @Get(':uniqueId')
  private async getMachine(
    @Param('uniqueId') uniqueId: string,
    @Headers('region') region: string,
  ): Promise<MachineDocument> {
    return await this.machineService.findOne(uniqueId, region);
  }

  @Get()
  private async getAllMachine(
    @Headers('region') region: string,
  ): Promise<MachineDocument[]> {
    return await this.machineService.findAll(region);
  }
  @Patch(':unique_id')
  private async updateMachine(
    @Param('unique_id') uniqueId: string,
    @Body() body: UpdateMachineDto,
  ): Promise<MachineDocument> {
    return this.machineService.findOneAndUpdate(uniqueId, body);
  }

  @Delete(':unique_id')
  private async deleteMachineByUniqueId(
    @Param('unique_id') uniqueId: string,
  ): Promise<void> {
    // using hard delete might use soft delete in future
    await this.machineService.deleteOne(uniqueId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('import')
  @UseInterceptors(FileInterceptor('file'), new CsvToJsonInterceptor())
  private async createManyMachine(
    @Body() body: CreateManyMachineDto,
    @Headers('region') region: string,
  ): Promise<MachineDocument[]> {
    return await this.machineService.createMany(body, region);
  }
}

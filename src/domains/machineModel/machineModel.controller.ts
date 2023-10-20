import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateMachineModelDto,
  CreateManyMachineModelDto,
  UpdateMachineModelDto,
} from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CsvToJsonInterceptor } from 'src/common/interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { MachineModelDocument } from './schema/machineModel.schema';
import { MachineModelService } from './machineModel.service';
import type { Response } from 'express';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
export class MachineModelController {
  public constructor(public machineModelService: MachineModelService) {}

  @Post('machinemodel')
  private async createMachineModel(
    @Body() body: CreateMachineModelDto,
  ): Promise<MachineModelDocument> {
    return await this.machineModelService.createOne(body);
  }

  @Get('machinemodel/:unique_id')
  private async getMachineModel(
    @Param('unique_id') uniqueId: string,
  ): Promise<MachineModelDocument> {
    return await this.machineModelService.findOne(uniqueId);
  }

  @Get('machinemodels')
  private async getAllMachineModel(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<MachineModelDocument[]> {
    return await this.machineModelService.findAll(pageNumber, pageSize);
  }

  @Put('machinemodel/:unique_id')
  private async updateMachineModel(
    @Param('unique_id') uniqueId: string,
    @Body() body: UpdateMachineModelDto,
  ): Promise<MachineModelDocument> {
    return await this.machineModelService.findOneAndUpdate(uniqueId, body);
  }

  @Delete('machinemodel/:unique_id')
  private async deleteMachineModel(
    @Param('unique_id') uniqueId: string,
  ): Promise<object> {
    // using hard delete might use soft delete in future
    return await this.machineModelService.deleteOne(uniqueId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('machinemodel/import')
  @UseInterceptors(FileInterceptor('file'), new CsvToJsonInterceptor())
  private async createManyMachineModel(
    @Body() body: CreateManyMachineModelDto,
  ): Promise<void> {
    await this.machineModelService.createMany(body);
  }

  @Get('machinemodel/export/:type')
  private async exportManyMachineModel(
    @Param('type') type: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.machineModelService.exportFile(type);

    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': `application/${file.type}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': `attachment; filename=MachineModel.${file.type}`,
    });

    return new StreamableFile(file.data);
  }
}

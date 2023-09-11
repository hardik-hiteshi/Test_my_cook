import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AUTH } from '../auth/decorator/auth.decorator';
import { ContextFields } from './schema/subSchema/contextFields.subSchema';
import { CreateManyRegionDto } from './dto/createManyRegion/createManyRegion.dto';
import { CreateRegionDTO } from './dto/createDTO/createRegion.dto';
import { RegionDocument } from './schema/region.schema';
import { RegionService } from './region.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateRegionDTO } from './dto/updateDTO/updateregion.dto';

@AUTH(Role.admin)
@Controller()
export class RegionController {
  public constructor(private regionService: RegionService) {}

  @Post('region')
  private async createRegion(
    @Body() body: CreateRegionDTO,
  ): Promise<RegionDocument> {
    return await this.regionService.createOne(body);
  }

  @Patch('region/:niceName')
  private async updateRegion(
    @Param('niceName') niceName: string,
    @Body() body: UpdateRegionDTO,
  ): Promise<RegionDocument> {
    return await this.regionService.updateOne(niceName, body);
  }
  @Delete('region/:niceName')
  private async deleteRegion(
    @Param('niceName') niceName: string,
  ): Promise<void> {
    await this.regionService.deleteOne(niceName);
  }

  @Get('region/:niceName')
  private async getRegion(
    @Param('niceName') niceName: string,
  ): Promise<RegionDocument> {
    return await this.regionService.findOne(niceName);
  }

  @Get()
  private async getAllRegion(): Promise<RegionDocument[]> {
    return await this.regionService.findAll();
  }

  @Get('region/:niceName/adminUser')
  private async getRegionAdminUser(
    @Param('niceName') niceName: string,
  ): Promise<RegionDocument> {
    return await this.regionService.findOneAdminUser(niceName);
  }

  @Get('region/:niceName/contextFields')
  private async getRegionContext(
    @Param('niceName') niceName: string,
  ): Promise<RegionDocument> {
    return await this.regionService.findOneContextFields(niceName);
  }

  @Get('region/:niceName/contextFields/:index')
  private async getRegionContextByIndex(
    @Param('niceName') niceName: string,
    @Param('index') index: number,
  ): Promise<ContextFields> {
    return await this.regionService.findOneContextFieldsByIndex(
      niceName,
      index,
    );
  }

  @Post('regions')
  private async createManyRegion(@Body() body: CreateManyRegionDto): Promise<{
    insertedDocuments: RegionDocument[];
    skippedDocuments: RegionDocument[];
  }> {
    return await this.regionService.createMany(body);
  }

  @Get('regions/adminUser/:niceName')
  private async getAllRegionAdminUser(
    @Param('niceName') niceName: string,
  ): Promise<RegionDocument> {
    return await this.regionService.findAllAdminUser(niceName);
  }
}

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
import { CreateRegionDTO } from './dto/createDTO/createregion.dto';
import { RegionDocument } from './schema/region.schema';
import { RegionService } from './region.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateRegionDTO } from './dto/updateDTO/updateregion.dto';

@AUTH(Role.admin)
@Controller('region')
export class RegionController {
  public constructor(private regionService: RegionService) {}

  @Post()
  private async createRegion(
    @Body() body: CreateRegionDTO,
  ): Promise<RegionDocument> {
    return await this.regionService.createOne(body);
  }

  @Patch(':nicename')
  private async updateRegion(
    @Param('nicename') niceName: string,
    @Body() body: UpdateRegionDTO,
  ): Promise<RegionDocument> {
    return await this.regionService.updateOne(niceName, body);
  }
  @Delete(':nicename')
  private async deleteRegion(
    @Param('nicename') niceName: string,
  ): Promise<void> {
    await this.regionService.deleteOne(niceName);
  }

  @Get(':nicename')
  private async getRegion(
    @Param('nicename') niceName: string,
  ): Promise<RegionDocument> {
    return await this.regionService.findOne(niceName);
  }
  @Get()
  private async getAllRegion(): Promise<RegionDocument[]> {
    return await this.regionService.findAll();
  }
}

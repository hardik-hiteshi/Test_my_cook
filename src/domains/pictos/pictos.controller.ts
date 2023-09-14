import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateManyPictostDto, CreatePictosDto, UpdatePictosDto } from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { PictosDocument } from './schema/pictos.schema';
import { PictosService } from './pictos.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller('pictos')
export class PictosController {
  public constructor(private pictosService: PictosService) {}

  @Post()
  private async createPictos(
    @Headers('region') region: string,
    @Body() body: CreatePictosDto,
  ): Promise<PictosDocument> {
    return await this.pictosService.createOne(body, region);
  }

  @Post('create-many')
  private async createManyPictos(
    @Body() body: CreateManyPictostDto,
  ): Promise<PictosDocument[]> {
    return await this.pictosService.createMany(body);
  }

  @Put(':nicename')
  private async updatePictos(
    @Headers('region') region: string,
    @Param('nicename') niceName: string,
    @Body() body: UpdatePictosDto,
  ): Promise<PictosDocument> {
    return await this.pictosService.updateOne(niceName, body, region);
  }

  @Get('enum')
  private async getDistinctNiceName(
    @Headers('region') region: string,
  ): Promise<string[]> {
    return this.pictosService.findDistinctNiceName(region);
  }

  @Get(':nicename')
  private async getOne(
    @Headers('region') region: string,
    @Param('nicename') niceName: string,
  ): Promise<PictosDocument> {
    return await this.pictosService.findOne(niceName, region);
  }
  @Get()
  private async getAll(
    @Headers('region') region: string,
  ): Promise<PictosDocument[]> {
    return await this.pictosService.findAll(region);
  }
  @Delete(':nicename')
  private async deleteOne(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.pictosService.deleteOne(region, niceName);
  }

  @Delete(':nicename/image')
  private async deleteImage(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    return await this.pictosService.deleteImage(region, niceName);
  }
}

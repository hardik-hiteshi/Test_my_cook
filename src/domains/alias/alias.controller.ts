import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateAliasDto, UpdateAliasDto } from './dtos';
import { AliasDocument } from './schema/alias.schema';
import { AliasService } from './alias.service';
import { AUTH } from '../auth/decorator/auth.decorator';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller('alias')
export class AliasController {
  public constructor(private aliasService: AliasService) {}

  @Post()
  private async createAlias(
    @Body() body: CreateAliasDto,
  ): Promise<AliasDocument> {
    return this.aliasService.createOne(body);
  }
  @Patch(':nicename')
  private async updateAlias(
    @Param('nicename') niceName: string,
    @Body() body: UpdateAliasDto,
  ): Promise<AliasDocument> {
    return this.aliasService.updateOne(niceName, body);
  }
  @Get(':nicename')
  private async getAlias(
    @Param('nicename') niceName: string,
  ): Promise<AliasDocument> {
    return await this.aliasService.findOne(niceName);
  }

  @Get()
  private async getAllAlias(): Promise<AliasDocument[]> {
    return await this.aliasService.findAll();
  }

  // using hard delete might use soft delete in future
  @Delete(':nicename')
  private async deleteAlias(
    @Param('nicename') niceName: string,
  ): Promise<void> {
    await this.aliasService.deleteOne(niceName);
  }
}

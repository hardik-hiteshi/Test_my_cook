import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAliasDto, UpdateAliasDto } from './dtos';
import { AliasDocument } from './schema/alias.schema';
import { AliasService } from './alias.service';
import { AUTH } from '../auth/decorator/auth.decorator';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
export class AliasController {
  public constructor(private aliasService: AliasService) {}

  @Post('alias')
  private async createAlias(
    @Body() body: CreateAliasDto,
  ): Promise<AliasDocument> {
    return this.aliasService.createOne(body);
  }

  @Put('alias/:nicename')
  private async updateAlias(
    @Param('nicename') niceName: string,
    @Body() body: UpdateAliasDto,
  ): Promise<AliasDocument> {
    return this.aliasService.updateOne(niceName, body);
  }

  @Get('alias/:nicename')
  private async getAlias(
    @Param('nicename') niceName: string,
  ): Promise<AliasDocument> {
    return await this.aliasService.findOne(niceName);
  }

  // using hard delete might use soft delete in future
  @Delete('alias/:nicename')
  private async deleteAlias(
    @Param('nicename') niceName: string,
  ): Promise<object> {
    return await this.aliasService.deleteOne(niceName);
  }

  @Get('aliass')
  private async getAllAlias(): Promise<AliasDocument[]> {
    return await this.aliasService.findAll();
  }
}

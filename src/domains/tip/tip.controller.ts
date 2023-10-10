import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTipDto, UpdateTipDto } from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { Role } from '../auth/roles/permission.roles';
import { TipDocument } from './schema/tip.schema';
import { TipService } from './tip.service';

@AUTH(Role.admin)
@Controller()
export class TipController {
  public constructor(private tipService: TipService) {}

  @Get('tip/random')
  public async getRandomTip(
    @Headers('region') region: string,
  ): Promise<TipDocument> {
    return await this.tipService.findRandomTip(region);
  }

  @Get('tip/:uniqueId')
  public async getTip(
    @Param('uniqueId') uniqueId: string,
  ): Promise<TipDocument> {
    return await this.tipService.findOne(uniqueId);
  }

  @Post('tip')
  public async createTip(
    @Headers('region') region: string,
    @Body() body: CreateTipDto,
  ): Promise<TipDocument> {
    return await this.tipService.createOne(body, region);
  }

  @Put('tip/:uniqueId')
  public async updateTip(
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateTipDto,
  ): Promise<TipDocument> {
    return this.tipService.updateOne(uniqueId, body);
  }

  @Delete('tip/:uniqueId')
  public async deleteTip(@Param('uniqueId') uniqueId: string): Promise<object> {
    // using hard delete might use soft delete in future
    return await this.tipService.deleteOne(uniqueId);
  }

  @Get('tips')
  public async getAllTip(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<TipDocument[]> {
    return await this.tipService.findAll(region, search);
  }
}

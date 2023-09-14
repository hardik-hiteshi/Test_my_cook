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
import { MongoIdValidationPipe } from 'src/common/pipe';
import { Role } from '../auth/roles/permission.roles';
import { Schema } from 'mongoose';
import { TipDocument } from './schema/tip.schema';
import { TipService } from './tip.service';

@AUTH(Role.admin)
@Controller('tip')
export class TipController {
  public constructor(private tipService: TipService) {}
  @Get()
  public async getAllTip(
    @Headers('region') region: string,
    @Query('search') search?: string,
  ): Promise<TipDocument[]> {
    return await this.tipService.findAll(region, search);
  }

  @Get('random')
  public async getRandomTip(
    @Headers('region') region: string,
  ): Promise<TipDocument> {
    return await this.tipService.findRandomTip(region);
  }
  @Get(':id')
  public async getTip(
    @Param('id', MongoIdValidationPipe) id: Schema.Types.ObjectId,
  ): Promise<TipDocument> {
    return await this.tipService.findOne(id);
  }

  @Post()
  public async createTip(
    @Headers('region') region: string,
    @Body() body: CreateTipDto,
  ): Promise<TipDocument> {
    return await this.tipService.createOne(body, region);
  }

  @Put(':id')
  public async updateTip(
    @Param('id', MongoIdValidationPipe) id: Schema.Types.ObjectId,
    @Body() body: UpdateTipDto,
  ): Promise<TipDocument> {
    return this.tipService.updateOne(id, body);
  }
  @Delete(':id')
  public async deleteTip(
    @Param('id', MongoIdValidationPipe) id: Schema.Types.ObjectId,
  ): Promise<void> {
    // using hard delete might use soft delete in future
    return await this.tipService.deleteOne(id);
  }
}

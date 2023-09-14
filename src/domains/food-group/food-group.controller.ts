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
import {
  CreateFoodGroupDto,
  CreateManyFoodGroupDto,
  UpdateFoodGroupDto,
} from './dtos';
import { AUTH } from '../auth/decorator/auth.decorator';
import { FoodGroupDocument } from './schema/food-group.schema';
import { FoodGroupService } from './food-group.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
export class FoodGroupController {
  public constructor(private foodGroupService: FoodGroupService) {}

  @Post('foodgroup')
  private async createFoodGroup(
    @Body() body: CreateFoodGroupDto,
    @Headers('region') region: string,
  ): Promise<FoodGroupDocument> {
    return await this.foodGroupService.createOne(body, region);
  }

  @Post('foodgroups')
  private async createManyFoodGroup(
    @Body() body: CreateManyFoodGroupDto,
  ): Promise<FoodGroupDocument[]> {
    return await this.foodGroupService.createMany(body);
  }

  @Put('foodgroup/:nicename')
  private async updateFoodService(
    @Body() body: UpdateFoodGroupDto,
    @Headers('region') region: string,
    @Param('nicename') niceName: string,
  ): Promise<FoodGroupDocument> {
    return await this.foodGroupService.updateOne(body, region, niceName);
  }
  @Get('foodgroup/enum')
  private async getDistinctNiceName(
    @Headers('region') region: string,
  ): Promise<string[]> {
    return this.foodGroupService.findDistinctNiceName(region);
  }

  @Get('foodgroup/:nicename')
  private async getFoodGroup(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<FoodGroupDocument> {
    return await this.foodGroupService.findOne(niceName, region);
  }

  @Get('foodgroups')
  private async getAllFoodGroup(
    @Headers('region') region: string,
  ): Promise<FoodGroupDocument[]> {
    return await this.foodGroupService.findAll(region);
  }
  @Delete('foodgroup/:nicename')
  private async deleteFoodGroup(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.foodGroupService.deleteOne(niceName, region);
  }
  @Delete('foodgroup/:nicename/image')
  private async deleteImage(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    return await this.foodGroupService.deleteImage(region, niceName);
  }
}

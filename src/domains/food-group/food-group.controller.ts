import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateFoodGroupDto } from './dtos/createFoodGroup/createFoodGroup.dto';
import { FoodGroupDocument } from './schema/food-group.schema';
import { FoodGroupService } from './food-group.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateFoodGroupDto } from './dtos/updateFoodGroup/updateFoodGroup.dto';

@AUTH(Role.admin)
@Controller('food-group')
export class FoodGroupController {
  public constructor(private foodGroupService: FoodGroupService) {}

  @Post()
  private async createFoodGroup(
    @Body() body: CreateFoodGroupDto,
    @Headers('region') region: string,
  ): Promise<FoodGroupDocument> {
    return await this.foodGroupService.createOne(body, region);
  }

  @Patch(':nicename')
  private async updateFoodService(
    @Body() body: UpdateFoodGroupDto,
    @Headers('region') region: string,
    @Param('nicename') niceName: string,
  ): Promise<FoodGroupDocument> {
    return await this.foodGroupService.updateOne(body, region, niceName);
  }

  @Get(':nicename')
  private async getFoodGroup(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<FoodGroupDocument> {
    return await this.foodGroupService.findOne(niceName, region);
  }

  @Get()
  private async getAllFoodGroup(
    @Headers('region') region: string,
  ): Promise<FoodGroupDocument[]> {
    return await this.foodGroupService.findAll(region);
  }
  @Delete(':nicename')
  private async deleteFoodGroup(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.foodGroupService.deleteOne(niceName, region);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateDiscountDTO } from './dto/createDto/discount.create.dto';
import { DiscountDocument } from './schema/discount.schema';
import { DiscountService } from './discount.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateDiscountDTO } from './dto/updateDto/discount.update.dto';

@AUTH(Role.admin)
@Controller()
export class DiscountController {
  public constructor(public discountServices: DiscountService) {}

  @Post('discount')
  public async createDiscount(
    @Body() body: CreateDiscountDTO,
  ): Promise<DiscountDocument> {
    return await this.discountServices.createDiscount(body);
  }

  @Get('discount/:uniqueId')
  public async fetchDiscount(
    @Param('uniqueId') uniqueId: string,
  ): Promise<DiscountDocument> {
    return await this.discountServices.fetchDiscount(uniqueId);
  }

  @Put('discount/:uniqueId')
  public async updateDiscount(
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateDiscountDTO,
  ): Promise<DiscountDocument> {
    return await this.discountServices.updateDiscount(uniqueId, body);
  }

  @Delete('discount/:uniqueId')
  public async deleteDiscount(
    @Param('uniqueId') uniqueId: string,
  ): Promise<object> {
    return await this.discountServices.deleteDiscount(uniqueId);
  }

  @Get('discounts')
  public async fetchDiscounts(
    @Query('search') search?: string,
  ): Promise<DiscountDocument[]> {
    return await this.discountServices.fetchDiscounts(search);
  }
}

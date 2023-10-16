import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateOrderDTO } from './dto/createDto/order.create.dto';
import { OrderDocument } from './schema/order.schema';
import { OrderService } from './order.service';
import { Response } from 'express';
import { Role } from '../auth/roles/permission.roles';
import { UpdateOrderDTO } from './dto/updateDto/order.update.dto';

@AUTH(Role.admin)
@Controller()
export class OrderController {
  public constructor(public orderServices: OrderService) {}

  @Post('order')
  public async createOrder(
    @Body() body: CreateOrderDTO,
  ): Promise<OrderDocument> {
    return await this.orderServices.createOrder(body);
  }

  @Get('order/:id')
  public async fetchOrder(@Param('id') id: string): Promise<OrderDocument> {
    return await this.orderServices.fetchOrder(id);
  }

  @Put('order/:id')
  public async updateOrder(
    @Param('id') id: string,
    @Body() body: UpdateOrderDTO,
  ): Promise<OrderDocument> {
    return await this.orderServices.updateOrder(id, body);
  }

  @Delete('order/:id')
  public async deleteOrder(@Param('id') id: string): Promise<object> {
    return await this.orderServices.deleteOrder(id);
  }

  @Get('orders')
  public async fetchOrders(
    @Query('search') search?: string,
  ): Promise<OrderDocument[]> {
    return await this.orderServices.fetchOrders(search);
  }

  @Get('order/export/:type')
  private async exportOrder(
    @Param('type') type: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.orderServices.exportFile(type);

    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': `application/${file.type}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': `attachment; filename=PostTags.${file.type}`,
    });

    return new StreamableFile(file.data);
  }
}

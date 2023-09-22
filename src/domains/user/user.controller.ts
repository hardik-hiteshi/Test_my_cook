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

import { UpdatePasswordDto, UserCreateDto, UserUpdateDto } from './dto';
import { AUTH } from '../auth/decorator/auth.decorator';
import { GET_USER } from '../auth/decorator';
import { Role } from '../auth/roles/permission.roles';
import { UserDocument } from './schema/user.schema';
import { UserService } from './user.service';

@AUTH(Role.admin, Role.superadmin)
@Controller()
export class UserController {
  public constructor(private userService: UserService) {}

  @Post('user')
  private async create(
    @Body() body: UserCreateDto,
    @Headers('region') region: string,
  ): Promise<UserDocument> {
    return await this.userService.create(body, region);
  }

  @Get('user')
  private getMe(@GET_USER() user: UserDocument): UserDocument {
    return user;
  }

  @Get('users')
  private async getAllUsers(
    @Headers('region') region: string,
  ): Promise<UserDocument[]> {
    return await this.userService.findAll(region);
  }

  @Get('user/:nicename')
  private async getUser(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<UserDocument> {
    return await this.userService.findOne(niceName, region);
  }

  @Delete('user/:nicename')
  private async deleteUser(
    @GET_USER() user: UserDocument,
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.userService.deleteOne(user, niceName, region);
  }

  @Put('user/updatePassword/:nicename')
  private async updatePassword(
    @GET_USER() user: UserDocument,
    @Body() body: UpdatePasswordDto,
  ): Promise<void> {
    await this.userService.updatePassword(user, body);
  }

  @Put('user/:nicename')
  private async updateUser(
    @GET_USER() user: UserDocument,
    @Body() body: UserUpdateDto,
    @Headers('region') region: string,
    @Param('nicename') niceName: string,
  ): Promise<UserDocument> {
    return await this.userService.findOneAndUpdate(
      user,
      niceName,
      body,
      region,
    );
  }
}

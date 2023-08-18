import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { UpdatePasswordDto, UserCreateDto, UserUpdateDto } from './dto';
import { AUTH } from '../auth/decorator/auth.decorator';
import { GET_USER } from '../auth/decorator';
import { Role } from '../auth/roles/permission.roles';
import { UserDocument } from './schema/user.schema';
import { UserService } from './user.service';

@AUTH(Role.admin)
@Controller('user')
export class UserController {
  public constructor(private userService: UserService) {}

  @Post('create')
  private async create(@Body() body: UserCreateDto): Promise<UserDocument> {
    return await this.userService.create(body);
  }

  @Get('me')
  private getMe(@GET_USER() user: UserDocument): UserDocument {
    return user;
  }

  @Get()
  private async getAllUsers(): Promise<UserDocument[]> {
    return await this.userService.findAll();
  }

  @Get(':nicename')
  private async getUser(
    @Param('nicename') niceName: string,
  ): Promise<UserDocument> {
    return await this.userService.findOne(niceName);
  }

  @Delete(':nicename')
  private async deleteUser(
    @GET_USER() user: UserDocument,
    @Param('nicename') niceName: string,
  ): Promise<void> {
    await this.userService.deleteOne(user, niceName);
  }

  @Patch('updatePassword')
  private async updatePassword(
    @GET_USER() user: UserDocument,
    @Body() body: UpdatePasswordDto,
  ): Promise<void> {
    await this.userService.updatePassword(user, body);
  }

  @Patch(':nicename')
  private async updateUser(
    @GET_USER() user: UserDocument,
    @Body() body: UserUpdateDto,
    @Param('nicename') niceName: string,
  ): Promise<UserDocument> {
    return await this.userService.findOneAndUpdate(user, niceName, body);
  }
}

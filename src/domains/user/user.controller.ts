import {
  Controller,
  Post,
  HttpStatus,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';

import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { UserDocument } from './schema/user.schema';
import { Auth } from '../auth/decorator/auth.decorator';
import { Role } from '../auth/roles/permission.roles';
import { UserCreateDto, UpdatePasswordDto } from './dto';

// @Auth(Role.admin)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async create(@Body() body: UserCreateDto) {
    return await this.userService.create(body);
  }

  @Get('me')
  getMe(@GetUser() user: UserDocument): UserDocument {
    return user;
  }
  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':nicename')
  async getUser(@Param('nicename') niceName: string): Promise<UserDocument> {
    return await this.userService.findOne(niceName);
  }

  @Delete(':nicename')
  async deleteUser(
    @GetUser() user: UserDocument,
    @Param('nicename') niceName: string,
  ): Promise<void> {
    await this.userService.deleteOne(user, niceName);
  }

  @Patch('updatePassword')
  async updatePassword(
    @GetUser() user: UserDocument,
    @Body() body: UpdatePasswordDto,
  ): Promise<void> {
    await this.userService.updatePassword(user, body);
  }

  @Patch(':nicename')
  async updateUser(
    @GetUser() user: UserDocument,
    @Body() body,
    @Param('nicename') niceName: string,
  ): Promise<void> {
    await this.userService.findOneAndUpdate(user, niceName, body);
  }
}

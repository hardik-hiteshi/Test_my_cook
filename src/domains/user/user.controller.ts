import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { UpdatePasswordDto, UserCreateDto } from './dto';
import { Auth } from '../auth/decorator/auth.decorator';
import { GetUser } from '../auth/decorator';
import { Role } from '../auth/roles/permission.roles';
import { UserDocument } from './schema/user.schema';
import { UserService } from './user.service';

@Auth(Role.admin)
@Controller('user')
export class UserController {
  public constructor(private userService: UserService) {}

  @Post('create')
  public async create(@Body() body: UserCreateDto): Promise<UserDocument> {
    return await this.userService.create(body);
  }

  @Get('me')
  public getMe(@GetUser() user: UserDocument): UserDocument {
    return user;
  }
  @Get()
  public async getAllUsers(): Promise<Array<UserDocument>> {
    return await this.userService.findAll();
  }

  @Get(':nicename')
  public async getUser(
    @Param('nicename') niceName: string,
  ): Promise<UserDocument> {
    return await this.userService.findOne(niceName);
  }

  @Delete(':nicename')
  public async deleteUser(
    @GetUser() user: UserDocument,
    @Param('nicename') niceName: string,
  ): Promise<void> {
    await this.userService.deleteOne(user, niceName);
  }

  @Patch('updatePassword')
  public async updatePassword(
    @GetUser() user: UserDocument,
    @Body() body: UpdatePasswordDto,
  ): Promise<void> {
    await this.userService.updatePassword(user, body);
  }

  @Patch(':nicename')
  public async updateUser(
    @GetUser() user: UserDocument,
    @Body() body,
    @Param('nicename') niceName: string,
  ): Promise<void> {
    await this.userService.findOneAndUpdate(user, niceName, body);
  }
}

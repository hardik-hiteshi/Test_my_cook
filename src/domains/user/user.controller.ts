import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Res,
  StreamableFile,
} from '@nestjs/common';

import { UpdatePasswordDto, UserCreateDto, UserUpdateDto } from './dto';
import { AUTH } from '../auth/decorator/auth.decorator';
import { GET_USER } from '../auth/decorator';
// import { IGetFollowindAndFlowers } from './interface/returnType.interface';
import type { Response } from 'express';
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

  // @Post(':nicename/block/:blockUserNiceName')
  // private async blockUser(
  //   @Param('nicename') niceName: string,
  //   @Param('blockUserNiceName') blockUserNiceName,
  //   @Headers('region') region: string,
  // ): Promise<void> {
  //   return await this.userService.blockUser(
  //     region,
  //     niceName,
  //     blockUserNiceName,
  //   );
  // }

  // @Post(':nicename/unblock/:blockUserNiceName')
  // private async unblockUser(
  //   @Param('nicename') niceName: string,
  //   @Param('blockUserNiceName') blockUserNicename: string,
  //   @Headers('region') region: string,
  // ): Promise<void> {
  //   return await this.userService.unblockUser(
  //     region,
  //     niceName,
  //     blockUserNicename,
  //   );
  // }
  // @Post(':nicename/done/:recipeNiceName')
  // private async addDoneRecipe(
  //   @Headers('region') region: string,
  //   @Param('nicename') niceName: string,
  //   @Param('recipeNiceName') recipeNiceName: string,
  //   @GET_USER() user: UserDocument,
  // ): Promise<void> {
  //   await this.userService.addDoneRecipe(
  //     region,
  //     niceName,
  //     recipeNiceName,
  //     user,
  //   );
  // }
  // @Post()
  // private async followUser(
  //   @Headers('region') region: string,
  //   @GET_USER() user: UserDocument,
  //   @Param('nicename') niceName: string,
  //   @Param('followingNiceName') followingNiceName: string,
  // ): Promise<void> {
  //   await this.userService.followUser(
  //     region,
  //     user,
  //     niceName,
  //     followingNiceName,
  //   );
  // }

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

  // @Get(':nicename/followers')
  // private async listFollowingAndFollowers(
  //   @Headers('region') region: string,
  //   @Param('nicename') niceName: string,
  // ): Promise<IGetFollowindAndFlowers> {
  //   return await this.userService.listFollowingAndFollowers(region, niceName);
  // }

  // @Get(':nicename/blocked')
  // private async getBlockedUser(
  //   @Param('nicename') niceName: string,
  //   @Headers('region') region: string,
  // ): Promise<
  //   {
  //     niceName: string;
  //     displayName: string;
  //   }[]
  // > {
  //   return await this.userService.getBlockedUsers(niceName, region);
  // }

  // @Get(':nicename/blockedBy')
  // private async getBlockedByUser(
  //   @Param('nicename') niceName: string,
  //   @Headers('region') region: string,
  // ): Promise<
  //   {
  //     niceName: string;
  //     displayName: string;
  //   }[]
  // > {
  //   return await this.userService.getBlockedByUsers(region, niceName);
  // }

  @Get('export/:type')
  private async exportManyMachineModel(
    @Param('type') type: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.userService.exportFile(type);

    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': `application/${file.type}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': `attachment; filename=MachineModel.${file.type}`,
    });

    return new StreamableFile(file.data);
  }

  @Delete('user/:nicename')
  private async deleteUser(
    @GET_USER() user: UserDocument,
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<object> {
    return await this.userService.deleteOne(user, niceName, region);
  }

  // @Delete(':nicename/following/:followingNiceName')
  // private async unfollowUser(
  //   @Headers('region') region: string,
  //   @GET_USER() user: UserDocument,
  //   @Param('nicename') niceName: string,
  //   @Param('followingNiceName') followingNiceName: string,
  // ): Promise<void> {
  //   return await this.userService.unfollowUser(
  //     region,
  //     user,
  //     niceName,
  //     followingNiceName,
  //   );
  // }

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
  ): Promise<Partial<UserDocument>> {
    return await this.userService.findOneAndUpdate(
      user,
      niceName,
      body,
      region,
    );
  }
}

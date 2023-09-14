import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserLogDTO } from './dtos/createUserlog.dto';
import { UserLogDocument } from './schema/user-log.schema';
import { UserLogService } from './user-log.service';

@Controller('user-log')
export class UserLogController {
  public constructor(public ulservice: UserLogService) {}

  @Post()
  public async createUserLog(
    @Headers('region') region: string,
    @Body() body: CreateUserLogDTO,
  ): Promise<UserLogDocument> {
    return await this.ulservice.createUserLog(region, body);
  }

  @Get(':niceName')
  public async fetchUserLog(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<UserLogDocument> {
    return await this.ulservice.fetchUserLog(region, niceName);
  }
  @Get()
  public async fetchAllUserLog(
    @Headers('region') region: string,
  ): Promise<UserLogDocument[]> {
    return await this.ulservice.fetchAllUserLog(region);
  }
  // //not clear if user logs are updated or not.
  //   @Put(':niceName')
  //   public async updateUserLog(
  //     @Headers('region') region: string,
  //     @Param('niceName') niceName: string,
  //   ): Promise<UserLogDocument> {
  //     return await this.ulservice.updateUserLog(region, niceName);
  //   }
  @Delete(':niceName')
  public async deleteUserLog(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<UserLogDocument> {
    return await this.ulservice.deleteUserLog(region, niceName);
  }
}

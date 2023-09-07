import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserLogDTO } from './dtos/createUserlog.dto';
import { UserLogDocument } from './schema/user-log.schema';
import { UserLogRepository } from './repository/UserLog.repository';

@Injectable()
export class UserLogService {
  public exists = 'UserLog Already exists';
  public notfound = 'UserLog not found';
  public constructor(public ulRepo: UserLogRepository) {}

  public async createUserLog(
    region: string,
    body: CreateUserLogDTO,
  ): Promise<UserLogDocument> {
    // return await this.ulRepo.createUserLog(region, body);
    const userLog = await this.ulRepo.findOne(region, body);
    if (!userLog) {
      const userLog = await this.ulRepo.create(region, body);

      return userLog;
    }
    throw new BadRequestException(this.exists);
  }

  public async fetchUserLog(
    region: string,
    niceName: string,
  ): Promise<UserLogDocument> {
    const userLog = await this.ulRepo.fetch(region, niceName);
    if (!userLog) {
      throw new BadRequestException(this.notfound);
    }

    return userLog;
  }

  public async fetchAllUserLog(region: string): Promise<UserLogDocument[]> {
    const userLogList = await this.ulRepo.fetchAll(region);
    if (userLogList.length > 0) {
      return userLogList;
    }
    throw new NotFoundException(this.notfound);
  }
  // //not clear if user logs are updated or not.
  //   public async updateUserLog(
  //     region: string,
  //     niceName: string,
  //   ): Promise<UserLogDocument> {
  //     return await this.ulRepo.updateUserLog(region, niceName);
  //   }

  public async deleteUserLog(
    region: string,
    niceName: string,
  ): Promise<UserLogDocument> {
    const deletedUserLog = await this.ulRepo.deleteUserLog(region, niceName);
    if (!deletedUserLog) {
      throw new NotFoundException(this.notfound);
    }

    return deletedUserLog;
  }
}

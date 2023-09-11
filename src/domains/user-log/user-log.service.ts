/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserLogDTO } from './dtos/createUserlog.dto';
import moment from 'moment';
import { UserDocument } from '../user/schema/user.schema';
import { UserLogDocument } from './schema/user-log.schema';
import { UserLogRepository } from './repository/UserLog.repository';

@Injectable()
export class UserLogService {
  public exists = 'UserLog Already exists';
  public notfound = 'UserLog not found';
  public constructor(public ulRepo: UserLogRepository) {}

  public async createIncomingUserLog(
    user: UserDocument,
    agent: string,
    region: string,
    ip?: string,
    redirect?: string,
    forwarded?: string,
    date?: Date,
    rate?: number,
    commentId?: string,
    legalType?: string,
    type?: string,
  ): Promise<object> {
    const incomingLogObj = {};
    incomingLogObj['user'] = 'anonymous';
    if (user) {
      incomingLogObj['user'] = user._id;
    }
    if (ip) {
      incomingLogObj['ip'] = ip;
    }
    if (redirect) {
      incomingLogObj['ip'] = redirect;
    }
    if (forwarded) {
      incomingLogObj['ip'] = forwarded;
    }
    if (ip) {
      incomingLogObj['ip'] = ip;
    }
    if (user.role == 'machine') {
      incomingLogObj['machine'] = user.role;
    }
    if (!date) {
      incomingLogObj['date'] = new Date();
    }
    if (rate) {
      incomingLogObj['rate'] = rate;
    }
    if (commentId) {
      incomingLogObj['commentId'] = commentId;
    }
    if (legalType) {
      incomingLogObj['legalType'] = legalType;
    }
    if (type) {
      incomingLogObj['type'] = type;
    }
    incomingLogObj['date'] = new Date(date);
    incomingLogObj['region'] = region;
    incomingLogObj['agent'] = agent;
    incomingLogObj['machine'] = undefined;
    // console.log(incomingLogObj);
    if (incomingLogObj[type] == 'recipe/cooked') {
      let flag = false;
      const recipe = await this.ulRepo.checkRepeatedRecipeCooked(
        incomingLogObj,
      );
      let seconds = 0;
      if (recipe) {
        seconds = recipe.groups
          ? recipe.groups.reduce(
            (acum, group) =>
              group.steps
                ? acum +
                    group.steps.reduce(
                      (stepAcum, step) => stepAcum + step.cookTime,
                      0,
                    )
                : acum,
            0,
          )
          : 0;
        const minimumTime = seconds
          ? parseInt(String(seconds + seconds / 2))
          : 5400; // Hora y media de default /;
        const mom = moment(incomingLogObj['date']).subtract(
          minimumTime,
          'seconds',
        );
        incomingLogObj['date'] = { $gte: mom.toDate() };
        const query = { $gte: mom.toDate() };
        const log = await this.ulRepo.findquery(query);
        flag = log ? true : false;
        if (!flag) {
          const newUserLog = await this.ulRepo.createnewlog(incomingLogObj);

          return newUserLog;
        }
        if (!incomingLogObj['type']) {
        }
      }
    }
  }

  public async createUserLog(
    region: string,
    body: CreateUserLogDTO,
  ): Promise<UserLogDocument> {
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

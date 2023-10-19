/* eslint-disable indent */
/* eslint-disable @typescript-eslint/naming-convention */
import * as _ from 'lodash';
import * as ipInt from 'ip-to-int';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeoLocationService } from 'src/domains/geoLocation/geoLocation.service';
import { Request } from 'express';
import { UserLogService } from 'src/domains/user-log/user-log.service';

@Injectable()
export class CommonService {
  public constructor(
    private configService: ConfigService,
    private geoLocationService: GeoLocationService,
    private ulServices: UserLogService,
  ) {}

  public fileUpload(file: Array<Express.Multer.File>, type: string): object[] {
    if (!file || file.length <= 0)
      throw new BadRequestException('request must contain file');
    const baseUrl = this.configService.get('BASE_URL');
    const result = file.map((data, index) => ({
      [index]: `${baseUrl}/image/${type}/${data.filename}`,
    }));

    return result;
  }

  public isEmpty(obj: object): boolean {
    if (obj === null || obj === undefined) return true;

    if (Array.isArray(obj) && obj.length > 0) return false;
    if (Array.isArray(obj) && obj.length === 0) return true;

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  }

  public async getGeos(
    req: Request,
    ip: string,
  ): Promise<{
    geo: {
      ll: {
        0: string;
        1: string;
      };
    };
    ip: string;
  }> {
    const publicIP = '147.83.113.200';
    ip = ip.replace('::ffff:', '');

    // Avoid geo-ipeing localhost :)
    if (ip == '127.0.0.1' || ip.startsWith('192.168.')) {
      ip = publicIP;
    }

    if (ip == '::1') {
      ip = publicIP;
    }

    const ip_int = ipInt(ip).toInt();

    let geo = {
      ll: {
        0: '1',
        1: '1',
      },
    };

    const query = {
      $and: [
        { network_start_ip: { $lte: ip_int } },
        { network_last_ip: { $gte: ip_int } },
      ],
    };

    if (ip_int !== 'undefined' || ip_int !== null) {
      const coor = await this.geoLocationService.getGeoLocation(query);
      console.log('coor', coor);

      if (coor) {
        geo = {
          ll: {
            0: coor.latitude,
            1: coor.longitude,
          },
        };
      } else {
        throw new NotFoundException(
          'No latitude for this IP in Mongo database',
        );
      }
    } else {
      throw new NotFoundException('No latitude for this IP in Mongo database');
    }

    return { geo, ip };
  }

  public async fillUserLog(
    incomingUserLog: object,
    req: Request,
    ip: string,
  ): Promise<object> {
    if (req['user'] && req['user']['role'] == 'machine') {
      incomingUserLog['machine'] = req['user']['serial'];
    } else {
      if (!incomingUserLog['user']) {
        incomingUserLog['user'] = _.get(req, 'user.niceName', 'anonymous');
      }
      if (!incomingUserLog['machine']) {
        incomingUserLog['machine'] = _.get(req, 'user.machine', undefined);
      }
    }

    if (!incomingUserLog['date'] || this.isEmpty(incomingUserLog['date'])) {
      incomingUserLog['date'] = new Date();
    } else {
      incomingUserLog['date'] = new Date(incomingUserLog['date']);
    }
    incomingUserLog['ip'] = ip;

    if (req['region'] && req['region'] != '') {
      incomingUserLog['region'] = req['region'];
    }

    return incomingUserLog;
  }

  public async addUserLog(
    incomingUserLog: object,
    req: Request,
    ip: string,
    region: string,
    redirect?: string,
    forwarded?: string,
    date?: Date,
    rate?: number,
    commentId?: string,
    legalType?: string,
  ): Promise<void> {
    incomingUserLog = await this.fillUserLog(incomingUserLog, req, ip);

    const newUserLog = await this.ulServices.createIncomingUserLog(
      req['user'],
      req.headers['user-agent'],
      region,
      ip,
      redirect,
      forwarded,
      date,
      rate,
      commentId,
      legalType,
      incomingUserLog,
    );

    if (!newUserLog['type']) {
      throw new BadRequestException('Userlog without type. LOG:');
      //log.error('Userlog without type. LOG:', incomingUserLog);
    }
  }
}

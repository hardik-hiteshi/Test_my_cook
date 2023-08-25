import * as csv from 'csvtojson';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CsvToJsonInterceptor implements NestInterceptor {
  public async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Express.Request>> {
    const req = context.switchToHttp().getRequest();
    const value = req.file;
    const data = await csv().fromString(value.buffer.toString());
    req.body = null;
    req.body = { array: data };

    return next.handle();
  }
}

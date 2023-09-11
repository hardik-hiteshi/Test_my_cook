import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
@Injectable()
export class CheckRegionInterceptor implements NestInterceptor {
  public async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Express.Request>> {
    const req: Request = context.switchToHttp().getRequest();

    if (
      req.path == '/login' ||
      req.path.split('/').includes('region') ||
      req.path.split('/').includes('regions')
    ) {
      return next.handle();
    }
    if (!req.headers.region) {
      throw new BadRequestException('region in header cannot be empty');
    }

    return next.handle();
  }
}

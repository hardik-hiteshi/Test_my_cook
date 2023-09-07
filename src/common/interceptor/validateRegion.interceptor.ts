import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ValidateRegionInterceptor implements NestInterceptor {
  public constructor(private allowedRegions: string[]) {}
  public async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Express.Request>> {
    if (this.allowedRegions.length <= 0) {
      return next.handle();
    }
    const req = context.switchToHttp().getRequest();

    if (req.path == '/login' || req.path.split('/').includes('region')) {
      return next.handle();
    }
    if (!this.isRegionValid(req.headers.region)) {
      throw new BadRequestException([
        'Invalid region specified in the headers',
        `region must be one of the following values:${this.allowedRegions.join(
          ', ',
        )} `,
      ]);
    }

    return next.handle();
  }

  private isRegionValid(region: string): boolean {
    return this.allowedRegions.includes(region);
  }
}

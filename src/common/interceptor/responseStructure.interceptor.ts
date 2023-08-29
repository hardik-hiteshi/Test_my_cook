import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseStructureInterceptor implements NestInterceptor {
  public async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<object>> {
    const response = await context.switchToHttp().getResponse();

    return next
      .handle()
      .pipe(
        map((data) =>
          data
            ? { status: response.statusCode, msg: 'success', data }
            : { status: response.statusCode, msg: 'success' },
        ),
      );
  }
}

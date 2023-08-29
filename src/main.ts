import {
  CheckRegionInterceptor,
  ResponseStructureInterceptor,
} from './common/interceptor';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(
    new CheckRegionInterceptor(),
    new ResponseStructureInterceptor(),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();

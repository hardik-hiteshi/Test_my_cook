import {
  CheckRegionInterceptor,
  ResponseStructureInterceptor,
  ValidateRegionInterceptor,
} from './common/interceptor';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import regions from './common/enum/region.enum';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(
    new CheckRegionInterceptor(),
    new ValidateRegionInterceptor(regions),
    new ResponseStructureInterceptor(),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(5000);
}
bootstrap();

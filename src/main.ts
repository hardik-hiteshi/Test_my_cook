import {
  CheckRegionInterceptor,
  ResponseStructureInterceptor,
  ValidateRegionInterceptor,
} from './common/interceptor';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import regions from './common/enum/region.enum';
import { setMongoCreds } from './config/db';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'Put', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.useGlobalInterceptors(
    new CheckRegionInterceptor(),
    new ValidateRegionInterceptor(regions),
    new ResponseStructureInterceptor(),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
setMongoCreds();
bootstrap();

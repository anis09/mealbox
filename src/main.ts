import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as validator from 'class-validator';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  validator.useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(app.get(ConfigService).get<number>('app.port'));
}
bootstrap();

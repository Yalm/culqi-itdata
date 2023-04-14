import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const configService = app.get(ConfigService);
  const httpConfig = configService.get('http');

  await app.listen(httpConfig.port, httpConfig.host);
  logger.log(
    `HTTP server listening at http://${httpConfig.host}:${httpConfig.port}`,
  );
}
bootstrap();

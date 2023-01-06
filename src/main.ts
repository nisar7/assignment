import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // use config service
  const configService = app.get(ConfigService);
  app.listen(configService.get('app.http.port'));
  console.log('configService', configService);
}
bootstrap();

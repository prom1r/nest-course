import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config'; // ConfigService
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService); // ConfigService from nestjs
  const port = configService.get('port'); //get port

  app.useGlobalPipes(new ValidationPipe()); // валидация данных при помощи pipe

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser());

  const swaggerConfig = new DocumentBuilder() //инициализация swagger
    .setTitle('NestJS API')
    .setDescription('NestJS API description')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig); //создание документа swagger
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}

bootstrap();

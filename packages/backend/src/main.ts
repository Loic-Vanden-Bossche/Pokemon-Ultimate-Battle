import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as yaml from 'yaml';

const initializeSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .addCookieAuth(process.env.COOKIE_NAME)
    .setTitle('Collecty API')
    .setDescription('The Collecty API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('openapi.yaml', yaml.stringify(document));
  SwaggerModule.setup('docs', app, document);
};

const whitelist = (origin, callback) => {
  if (
    !origin ||
    [
      'http://localhost:4200',
      'https://loic-vanden-bossche.github.io',
    ].indexOf(origin) !== -1
  ) {
    console.log('origin: ' + origin);
    callback(null, true);
  } else {
    console.log('origin: ' + origin);
    callback(new Error('Not allowed by CORS'));
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: whitelist,
  });
  initializeSwagger(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

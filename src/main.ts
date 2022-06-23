import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true, logger: ['log', 'debug', 'error'] });
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }));
  const config = new DocumentBuilder()
    .setTitle('Yeum Tung API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3005);
}
bootstrap();

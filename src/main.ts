import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DriverSeedingService } from './driver/driver-seeding.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const driverSeedingService = app.get(DriverSeedingService);

  app.enableVersioning();

  await driverSeedingService.seed();

  const config = new DocumentBuilder()
    .setTitle('Order example')
    .setDescription('The order API description')
    .setVersion('1.0')
    .addTag('Assignment')
    .addTag('Orders')
    .addTag('Projects')
    .addTag('When')
    .addTag('Vehicle')
    .addTag('Driver')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

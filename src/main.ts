import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DriverSeedingService } from './driver/driver-seeding.service';
import { SuggestionSeedingService } from './suggestion/suggestion-seeding.service';
import { VehicleSeedingService } from './vehicle/vehicle-seeding.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const driverSeedingService = app.get(DriverSeedingService);
  const vehicleSeedingService = app.get(VehicleSeedingService);
  const suggestionSeedingService = app.get(SuggestionSeedingService);

  app.enableVersioning();

  await driverSeedingService.seed();
  await vehicleSeedingService.seed();
  await suggestionSeedingService.seed();

  const config = new DocumentBuilder()
    .setTitle('Order example')
    .setDescription('The order API description')
    .setVersion('1.0')
    .addTag('Assignment')
    .addTag('Driver')
    .addTag('Order')
    .addTag('Project')
    .addTag('Suggestion')
    .addTag('Vehicle')
    .addTag('When')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();

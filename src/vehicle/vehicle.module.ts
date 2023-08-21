import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { VehicleSeedingService } from './vehicle-seeding.service';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, PrismaService, VehicleSeedingService],
})
export class VehicleModule {}

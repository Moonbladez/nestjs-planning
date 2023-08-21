import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DriverSeedingService } from './driver-seeding.service';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

@Module({
  controllers: [DriverController],
  providers: [DriverService, PrismaService, DriverSeedingService],
})
export class DriverModule {}

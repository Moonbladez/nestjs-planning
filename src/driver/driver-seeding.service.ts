import { fakerNB_NO } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DriverSeedingService {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const existingDriverCount = await this.prisma.driver.count();

    if (existingDriverCount === 0) {
      const fakeDriver = Array.from({ length: 10 }, () => ({
        name: fakerNB_NO.person.fullName(),
      }));

      const seededDrivers = await this.prisma.driver.createMany({
        data: fakeDriver,
      });
      Logger.debug(
        `Seeded ${seededDrivers.count} drivers`,
        'DriverSeedingService',
      );
    } else {
      Logger.debug(`Drivers already seeded. Skipping.`, 'DriverSeedingService');
    }
  }
}

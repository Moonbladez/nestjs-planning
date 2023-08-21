import { fakerNB_NO } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DriverSeedingService {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const existingDriverCount = await this.prisma.driver.count();

    if (existingDriverCount === 0) {
      const fakeProducts = Array.from({ length: 10 }, () => ({
        name: fakerNB_NO.person.fullName(),
      }));

      const seededProducts = await this.prisma.driver.createMany({
        data: fakeProducts,
      });

      console.log('Seeded products:', seededProducts);
    } else {
      console.log('Products already seeded. Skipping.');
    }
  }
}

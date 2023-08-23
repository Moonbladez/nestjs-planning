import { fakerNB_NO } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VehicleSeedingService {
  constructor(private readonly prismaService: PrismaService) {}

  async seed() {
    const existingVehicleCount = await this.prismaService.vehicle.count();

    if (existingVehicleCount === 0) {
      const manufacturers = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Tesla'];

      // Fetch available drivers from the database
      const availableDrivers = await this.prismaService.driver.findMany();

      const fakeVehicles = Array.from({ length: 10 }, () => {
        const vehicleData: any = {
          registration: fakerNB_NO.vehicle.vrm(),
        };

        // Randomly assign a manufacturer to some vehicles
        if (Math.random() < 0.5) {
          vehicleData.manufacturer =
            fakerNB_NO.helpers.arrayElement(manufacturers);
        }

        //randomnly assign year
        if (Math.random() < 0.5) {
          vehicleData.modelYear = fakerNB_NO.date
            .past({ years: 10 })
            .getFullYear()
            .toString();
        }

        // Randomly assign a driver to some vehicles
        if (Math.random() < 0.3 && availableDrivers.length > 0) {
          const randomDriverIndex = Math.floor(
            Math.random() * availableDrivers.length,
          );
          const randomDriver = availableDrivers[randomDriverIndex];

          availableDrivers.splice(randomDriverIndex, 1);

          vehicleData.driverId = randomDriver.id;
        }

        return vehicleData;
      });

      const seededVehicles = await this.prismaService.vehicle.createMany({
        data: fakeVehicles,
      });

      console.info('Seeded vehicles:', seededVehicles);
    } else {
      console.info('Vehicles already seeded. Skipping.');
    }
  }
}

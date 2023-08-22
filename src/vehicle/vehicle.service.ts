import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}
  create(createVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({ data: createVehicleDto });
  }

  async findAll() {
    return this.prisma.vehicle.findMany({
      include: { driver: true },
    });
  }

  async findOne(internalNumber: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { internalNumber },
      include: { driver: true },
    });

    if (!vehicle) {
      throw new NotFoundException('No vehicle found');
    }

    return vehicle;
  }

  async update(internalNumber: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { internalNumber },
      include: { driver: true },
    });

    if (!vehicle) {
      throw new NotFoundException('No vehicle found');
    }

    return this.prisma.vehicle.update({
      where: { internalNumber: vehicle.internalNumber },
      data: updateVehicleDto,
    });
  }

  async remove(internalNumber: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { internalNumber },
    });

    if (!vehicle) {
      throw new NotFoundException('No vehicle found');
    }

    return this.prisma.vehicle.delete({
      where: { internalNumber: vehicle.internalNumber },
    });
  }
}

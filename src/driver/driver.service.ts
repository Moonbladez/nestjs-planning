import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDriverDto, UpdateDriverDto } from './dto';

@Injectable()
export class DriverService {
  constructor(private readonly prisma: PrismaService) {}
  create(createDriverDto: CreateDriverDto) {
    return this.prisma.driver.create({ data: createDriverDto });
  }

  findAll() {
    return this.prisma.driver.findMany();
  }

  async findOne(id: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
      include: {
        vehicle: true,
      },
    });

    if (!driver) {
      throw new NotFoundException('No driver found');
    }

    return driver;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
      include: {
        vehicle: true,
      },
    });

    if (!driver) {
      throw new NotFoundException('No driver found');
    }

    return this.prisma.driver.update({
      where: { id: driver.id },
      data: updateDriverDto,
    });
  }

  async remove(id: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
    });

    if (!driver) {
      throw new NotFoundException('No driver found');
    }

    return this.prisma.driver.delete({
      where: { id: driver.id },
    });
  }
}

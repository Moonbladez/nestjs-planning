import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWhenDto, UpdateWhenDto } from './dto';

@Injectable()
export class WhenService {
  constructor(private prisma: PrismaService) {}
  async create(createWhenDto: CreateWhenDto) {
    return this.prisma.when.create({ data: createWhenDto });
  }

  async findAll() {
    const when = this.prisma.when.findMany({});

    if (!when) {
      throw new NotFoundException('No when found');
    }

    return when;
  }

  async findOne(id: number) {
    const when = await this.prisma.when.findUnique({
      where: { id },
    });

    if (!when) {
      throw new NotFoundException(`No when object found with id: ${id}`);
    }

    return when;
  }

  async update(id: number, updateWhenDto: UpdateWhenDto) {
    const when = await this.prisma.when.update({
      where: { id },
      data: updateWhenDto,
    });

    if (!when) {
      throw new NotFoundException('No when found');
    }

    return when;
  }

  async remove(id: number) {
    const when = await this.prisma.when.findUnique({
      where: { id },
    });

    if (!when) {
      throw new NotFoundException(`No when object found with id: ${id}`);
    }

    return this.prisma.when.delete({
      where: { id: when.id },
    });
  }
}

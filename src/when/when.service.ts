import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationQueryDto } from 'src/shared/dto';
import { CreateWhenDto, UpdateWhenDto } from './dto';

@Injectable()
export class WhenService {
  constructor(private prisma: PrismaService) {}
  async create(createWhenDto: CreateWhenDto) {
    return this.prisma.when.create({ data: createWhenDto });
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.prisma.when.findMany({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    const when = await this.prisma.when.findUnique({
      where: { id },
    });

    if (!when) {
      throw new NotFoundException(`No when object found with id: ${id}`);
    }

    return when;
  }

  async update(id: string, updateWhenDto: UpdateWhenDto) {
    const when = await this.prisma.when.update({
      where: { id },
      data: updateWhenDto,
    });

    if (!when) {
      throw new NotFoundException('No when found');
    }

    return when;
  }

  async remove(id: string) {
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

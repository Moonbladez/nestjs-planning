import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssignmentDto, UpdateAssignmentDto } from './dto';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    const assignment = await this.prisma.assignment.create({
      data: createAssignmentDto,
    });

    return assignment;
  }

  findAll() {
    return this.prisma.assignment.findMany({});
  }

  findOne(id: number) {
    const assignment = this.prisma.assignment.findUnique({
      where: {
        id,
      },
    });

    if (!assignment) {
      throw new NotFoundException(`Assignment with id ${id} not found`);
    }

    return assignment;
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    const assignment = await this.prisma.assignment.update({
      where: {
        id,
      },
      data: updateAssignmentDto,
    });

    if (!assignment) {
      throw new NotFoundException(`Assignment with id ${id} not found`);
    }

    return assignment;
  }

  async remove(id: number) {
    const assignment = await this.prisma.assignment.findUnique({
      where: {
        id,
      },
    });

    if (!assignment) {
      throw new NotFoundException(`Assignment with id ${id} not found`);
    }

    return this.prisma.assignment.delete({
      where: {
        id,
      },
    });
  }
}

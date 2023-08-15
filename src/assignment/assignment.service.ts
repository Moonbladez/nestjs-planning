import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SharedService } from 'src/shared/shared.service';
import { CreateAssignmentDto, UpdateAssignmentDto } from './dto';

@Injectable()
export class AssignmentService {
  constructor(
    private prisma: PrismaService,
    private sharedService: SharedService,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    await Promise.all([
      this.sharedService.checkOrderExistence(createAssignmentDto.orderId),
    ]);

    return this.prisma.assignment.create({
      data: createAssignmentDto,
    });
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
    await Promise.all([
      this.sharedService.checkOrderExistence(updateAssignmentDto.orderId),
    ]);

    const assignmentToUpdate = await this.prisma.assignment.findUnique({
      where: {
        id: id,
      },
    });

    if (!assignmentToUpdate) {
      throw new NotFoundException(`Assignment with id ${id} not found`);
    }

    return this.prisma.assignment.update({
      where: {
        id,
      },
      data: updateAssignmentDto,
    });
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

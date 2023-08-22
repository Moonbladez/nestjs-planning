import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationQueryDto } from 'src/shared/dto';
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

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.prisma.assignment.findMany({
      skip: offset,
      take: limit,
    });
  }

  findOne(id: string) {
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

  async update(id: string, updateAssignmentDto: UpdateAssignmentDto) {
    await Promise.all([
      this.sharedService.checkOrderExistence(updateAssignmentDto.orderId),
    ]);

    const assignmentToUpdate = await this.prisma.assignment.findUnique({
      where: {
        id,
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

  async remove(id: string) {
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

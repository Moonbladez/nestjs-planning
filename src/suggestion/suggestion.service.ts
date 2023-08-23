import { Injectable, NotFoundException } from '@nestjs/common';
import { ASSIGNMENT_STATUS } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationQueryDto } from 'src/shared/dto';

@Injectable()
export class SuggestionService {
  constructor(private readonly prismaService: PrismaService) {}
  async approve(id: string) {
    const suggestion = await this.prismaService.suggestion.findUnique({
      where: { id },
    });

    if (!suggestion) {
      throw new NotFoundException(`Assignment with id ${id} not found`);
    }

    const approvedSuggestion = await this.prismaService.suggestion.update({
      where: { id },
      data: { status: ASSIGNMENT_STATUS.UnderPlanning },
    });

    await this.prismaService.assignment.create({
      data: approvedSuggestion,
    });

    await this.prismaService.suggestion.delete({ where: { id } });
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this.prismaService.suggestion.findMany({
      skip: offset,
      take: limit,
      include: {
        fromProject: true,
        toProject: true,
        order: true,
      },
    });
  }

  async findOne(id: string) {
    const suggestion = await this.prismaService.suggestion.findUnique({
      where: { id },
      include: {
        fromProject: true,
        toProject: true,
        order: true,
      },
    });

    if (!suggestion) {
      throw new NotFoundException(`Assignment with id ${id} not found`);
    }

    return suggestion;
  }

  async remove(id: string) {
    const suggestionToDelete = await this.prismaService.suggestion.findUnique({
      where: { id },
    });

    if (!suggestionToDelete) {
      throw new NotFoundException(`Assignment with id ${id} not found`);
    }

    return this.prismaService.suggestion.delete({ where: { id } });
  }
}

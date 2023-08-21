import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SharedService {
  constructor(private prisma: PrismaService) {}

  async checkProjectExistence(
    projectId: number,
    projectType: string,
  ): Promise<void> {
    if (projectId) {
      const project = await this.prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!project) {
        throw new NotFoundException(
          `${projectType} project with id ${projectId} not found`,
        );
      }
    }
  }

  async checkWhenExistence(whenId: number): Promise<void> {
    if (whenId) {
      const when = await this.prisma.when.findUnique({
        where: {
          id: whenId,
        },
      });

      if (!when) {
        throw new NotFoundException(`When with id ${whenId} not found`);
      }
    }
  }

  async checkOrderExistence(orderId: number): Promise<void> {
    if (orderId) {
      const order = await this.prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });

      if (!order) {
        throw new NotFoundException(`Order with id ${orderId} not found`);
      }
    } else {
      throw new NotFoundException('Order id is required');
    }
  }
}
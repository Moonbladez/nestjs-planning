import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  checkProjectExistence = async (
    projectId: number,
    projectType: string,
  ): Promise<void> => {
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
  };

  checkWhenExistence = async (whenId: number): Promise<void> => {
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
  };

  async create(createOrdertDto: CreateOrderDto) {
    const { fromProjectId, toProjectId, whenId } = createOrdertDto;

    console.log(whenId);

    await Promise.all([
      this.checkWhenExistence(whenId),
      this.checkProjectExistence(fromProjectId, 'From'),
      this.checkProjectExistence(toProjectId, 'To'),
    ]);

    return this.prisma.order.create({
      data: createOrdertDto,
    });
  }

  async findAll() {
    return this.prisma.order.findMany({});
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: +id,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const orderToUpdate = await this.prisma.order.findUnique({
      where: {
        id: +id,
      },
    });

    if (!orderToUpdate) {
      throw new NotFoundException('Order not found');
    }

    await Promise.all([
      this.checkProjectExistence(updateOrderDto.fromProjectId, 'From'),
      this.checkProjectExistence(updateOrderDto.toProjectId, 'To'),
      this.checkWhenExistence(updateOrderDto.whenId),
    ]);

    return this.prisma.order.update({
      where: {
        id: orderToUpdate.id,
      },
      data: updateOrderDto,
    });
  }

  async remove(id: number) {
    const orderToDelete = await this.prisma.order.findUnique({
      where: {
        id: +id,
      },
    });

    if (!orderToDelete) {
      throw new NotFoundException('Order not found');
    }

    return this.prisma.order.delete({
      where: {
        id: orderToDelete.id,
      },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SharedService } from 'src/shared/shared.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private sharedService: SharedService,
  ) {}

  async create(createOrdertDto: CreateOrderDto) {
    const { fromProjectId, toProjectId, whenId } = createOrdertDto;

    await Promise.all([
      this.sharedService.checkWhenExistence(whenId),
      this.sharedService.checkProjectExistence(fromProjectId, 'From'),
      this.sharedService.checkProjectExistence(toProjectId, 'To'),
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
      this.sharedService.checkProjectExistence(
        updateOrderDto.fromProjectId,
        'From',
      ),
      this.sharedService.checkProjectExistence(
        updateOrderDto.toProjectId,
        'To',
      ),
      this.sharedService.checkWhenExistence(updateOrderDto.whenId),
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

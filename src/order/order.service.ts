import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  create(createOrdertDto: CreateOrderDto) {
    return this.prisma.order.create({ data: createOrdertDto });
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

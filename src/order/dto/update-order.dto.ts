import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { ORDER_STATUS } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    description: 'Status of the order',
    enum: ORDER_STATUS,
  })
  @IsEnum(ORDER_STATUS)
  status: ORDER_STATUS;
}

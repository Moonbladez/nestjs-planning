import { ApiProperty } from '@nestjs/swagger';
import { VEHICLE_TYPE } from '@prisma/client';
import { IsBoolean, IsEnum, IsISO8601, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID of the source project',
    required: false,
    example: 1,
  })
  @IsOptional()
  fromProjectId?: number;

  @ApiProperty({
    description: 'ID of the destination project',
    required: false,
    example: 2,
  })
  @IsOptional()
  toProjectId?: number;

  @ApiProperty({
    description: 'Indicates if early delivery is required',
    example: true,
  })
  @IsBoolean()
  earlyDelivery: boolean;

  @ApiProperty({
    description: 'Date and time of the order',
    example: '2023-08-11T12:00:00.000Z',
  })
  @IsISO8601({ strict: true })
  date: Date;

  @ApiProperty({
    description: 'Type of the vehicle used for delivery',
    enum: VEHICLE_TYPE,
    required: false,
  })
  @IsOptional()
  @IsEnum(VEHICLE_TYPE)
  vehicleType?: VEHICLE_TYPE;
}

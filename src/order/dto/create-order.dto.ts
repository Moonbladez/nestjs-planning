import { ApiProperty } from '@nestjs/swagger';
import { VEHICLE_TYPE } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsISO8601,
  IsOptional,
} from 'class-validator';

export class CreateOrderDto {
  //from project
  @ApiProperty({
    description: 'id of the project',
    required: false,
    example: 1,
  })
  @IsOptional()
  fromProjectId: number;

  //to project
  @ApiProperty({
    description: 'id of the project',
    required: false,
    example: 2,
  })
  @IsOptional()
  toProjectId: number;

  // early delivery
  @IsBoolean()
  @ApiProperty({
    description: 'is early delivery required',
    example: true,
  })
  earlyDelivery: boolean;

  //date
  @ApiProperty({
    description: 'date of the order',
    example: '2023-08-11T12:00:00.000Z',
  })
  @IsDateString()
  @IsISO8601({
    strict: true,
  })
  date: Date;

  //vehicle type
  @ApiProperty({
    description: 'type of the vehicle',
    enum: VEHICLE_TYPE,
    required: false,
  })
  @IsOptional()
  vehicleType: VEHICLE_TYPE;
}

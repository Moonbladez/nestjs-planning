import { ApiProperty } from '@nestjs/swagger';
import { ASSIGNMENT_STATUS, ASSIGNMENT_TYPE } from '@prisma/client';
import { IsEnum, IsISO8601, IsOptional } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty({
    description: 'Date and time of the start of the assignment',
    example: '2023-08-14T12:00:00.000Z',
  })
  @IsISO8601({ strict: true })
  startTime: Date;

  @ApiProperty({
    description: 'Date and time of the assignment',
    example: '2023-08-18T12:00:00.000Z',
  })
  @IsISO8601({ strict: true })
  endTime: Date;

  @ApiProperty({
    description: 'The id of the order',
    type: 'number',
    required: false,
  })
  @IsOptional()
  orderId: number;

  @ApiProperty({
    description: 'Type of the assignment',
    enum: ASSIGNMENT_TYPE,
    example: ASSIGNMENT_TYPE.MassIn,
    required: false,
  })
  @IsEnum(ASSIGNMENT_TYPE)
  @IsOptional()
  type: ASSIGNMENT_TYPE;

  @ApiProperty({
    description: 'Status of the assignment',
    enum: ASSIGNMENT_STATUS,
    example: ASSIGNMENT_STATUS.UnderPlanning,
  })
  @IsEnum(ASSIGNMENT_STATUS)
  status: ASSIGNMENT_STATUS;
}

import { ApiProperty } from '@nestjs/swagger';
import { ASSIGNMENT_STATUS, ASSIGNMENT_TYPE } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class CreateAssignmentDto {
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

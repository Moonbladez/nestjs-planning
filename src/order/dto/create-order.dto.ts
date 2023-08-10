import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

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
}

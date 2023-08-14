import { ApiProperty } from '@nestjs/swagger';
import { WHEN_TYPE } from '@prisma/client';
import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';

export class CreateWhenDto {
  @ApiProperty({
    description: 'When type',
    type: 'enum',
    enum: WHEN_TYPE,
    example: WHEN_TYPE.BeforeFood,
  })
  @IsEnum(WHEN_TYPE)
  type: WHEN_TYPE;

  @ApiProperty({
    description: 'When from',
    example: '12:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/, {
    message: 'from must be in the format HH:mm:ss',
  })
  from: string;

  @ApiProperty({
    description: 'When to',
    example: '12:00:00',
    required: false,
  })
  @Matches(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/, {
    message: 'to must be in the format HH:mm:ss',
  })
  @IsString()
  @IsOptional()
  to: string;
}

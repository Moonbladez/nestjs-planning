import { ApiProperty } from '@nestjs/swagger';
import { ASSIGNMENT_STATUS } from '@prisma/client';
import { IsEnum, IsISO8601 } from 'class-validator';

export class CreateSuggestionDto {
  @ApiProperty({
    description: 'status of the suggestion',
    enum: ASSIGNMENT_STATUS,
    example: ASSIGNMENT_STATUS.Suggested,
  })
  @IsEnum(ASSIGNMENT_STATUS)
  status: ASSIGNMENT_STATUS;

  @ApiProperty({
    description: 'Date and time of the start of the suggestion',
    example: '2023-08-14T12:00:00.000Z',
  })
  @IsISO8601({ strict: true })
  startTime: Date;

  @ApiProperty({
    description: 'Date and end time of the suggestion',
    example: '2023-08-18T12:00:00.000Z',
  })
  endTime: Date;
}

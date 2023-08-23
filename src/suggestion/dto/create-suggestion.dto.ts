import { ApiProperty } from '@nestjs/swagger';

export class CreateSuggestionDto {
  @ApiProperty({
    description: 'Date and time of the start of the suggestion',
    example: '2023-08-14T12:00:00.000Z',
  })
  startTime: Date;

  @ApiProperty({
    description: 'Date and end time of the suggestion',
    example: '2023-08-18T12:00:00.000Z',
  })
  endTime: Date;
}

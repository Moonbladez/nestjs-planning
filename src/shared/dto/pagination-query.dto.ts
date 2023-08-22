import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Limit of items per page',
  })
  @IsPositive()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional({
    description: 'Offset',
  })
  @IsPositive()
  @IsOptional()
  offset: number;
}

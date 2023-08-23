import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  //Project name
  @ApiProperty({
    description: 'Project name',
    example: 'Project 1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  //Project region
  @ApiProperty({
    description: 'Project region',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  region: number;

  //Project latitude
  @ApiProperty({
    description: 'Project latitude',
    example: '1.234567',
    required: false,
  })
  @IsString()
  @IsOptional()
  latitude: string;

  //Project longitude
  @ApiProperty({
    description: 'Project longitude',
    example: '1.234567',
    required: false,
  })
  @IsString()
  @IsOptional()
  longitude: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'The registration of the vehicle',
    type: 'string',
    example: 'ABC123',
  })
  @IsNotEmpty({ message: 'Registration is required' })
  @IsString()
  registration: string;

  //assigedid

  @ApiProperty({
    description: 'The manufacturer of the vehicle',
    example: 'Volvo',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  manufacturer: string;

  @IsOptional()
  @IsString()
  mainCategory: string;

  @IsOptional()
  @IsString()
  subCategory: string;

  @ApiProperty({
    description: 'The model year of the vehicle',
    example: '2017',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  modelYear: string;

  @IsOptional()
  @IsString()
  modelName: string;

  @IsOptional()
  @IsString()
  statusName: string;
}

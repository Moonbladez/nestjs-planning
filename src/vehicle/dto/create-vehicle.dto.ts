import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty({ message: 'Registration is required' })
  @IsString()
  registration: string;

  //assigedid

  @IsOptional()
  @IsString()
  manufacturer: string;

  @IsOptional()
  @IsString()
  mainCategory: string;

  @IsOptional()
  @IsString()
  subCategory: string;

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

import { PartialType } from '@nestjs/swagger';
import { CreateWhenDto } from './create-when.dto';

export class UpdateWhenDto extends PartialType(CreateWhenDto) {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaginationQueryDto } from 'src/shared/dto';
import { CreateWhenDto, UpdateWhenDto } from './dto';
import { WhenService } from './when.service';

@ApiTags('When')
@Controller({ version: '1', path: 'when' })
export class WhenController {
  constructor(private readonly whenService: WhenService) {}

  @Post()
  create(@Body() createWhenDto: CreateWhenDto) {
    return this.whenService.create(createWhenDto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.whenService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.whenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateWhenDto: UpdateWhenDto) {
    return this.whenService.update(+id, updateWhenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.whenService.remove(+id);
  }
}

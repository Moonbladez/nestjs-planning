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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PaginationQueryDto } from 'src/shared/dto';
import { CreateWhenDto, UpdateWhenDto } from './dto';
import { WhenService } from './when.service';

@ApiTags('When')
@Controller({ version: '1', path: 'when' })
export class WhenController {
  constructor(private readonly whenService: WhenService) {}

  @ApiOperation({
    summary: 'Create a time instance',
  })
  @Post()
  create(@Body() createWhenDto: CreateWhenDto) {
    return this.whenService.create(createWhenDto);
  }

  @ApiOperation({
    summary: 'Get all time instances',
  })
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.whenService.findAll(paginationQuery);
  }

  @ApiOperation({
    summary: 'Get a time instance by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whenService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a time instance by id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhenDto: UpdateWhenDto) {
    return this.whenService.update(id, updateWhenDto);
  }

  @ApiOperation({
    summary: 'Delete a time instance by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whenService.remove(id);
  }
}

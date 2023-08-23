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
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/shared/dto';
import { DriverService } from './driver.service';
import { CreateDriverDto, UpdateDriverDto } from './dto';

@ApiTags('Driver')
@Controller({ version: '1', path: 'driver' })
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @ApiBody({ type: CreateDriverDto })
  @ApiOperation({
    summary: 'Create a driver',
  })
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @ApiOperation({
    summary: 'Get all drivers',
  })
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.driverService.findAll(paginationQuery);
  }

  @ApiOperation({
    summary: 'Get a driver by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a driver by id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(id, updateDriverDto);
  }

  @ApiOperation({
    summary: 'Delete a driver by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(id);
  }
}

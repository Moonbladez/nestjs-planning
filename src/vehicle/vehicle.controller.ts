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
import { CreateVehicleDto, UpdateVehicleDto } from './dto';
import { VehicleService } from './vehicle.service';

@ApiTags('Vehicle')
@Controller({ version: '1', path: 'vehicle' })
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOperation({
    summary: 'Create a vehicle',
  })
  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @ApiOperation({
    summary: 'Get all vehicles',
  })
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.vehicleService.findAll(paginationQuery);
  }

  @ApiOperation({
    summary: 'Get a vehicle by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a vehicle by id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @ApiOperation({
    summary: 'Delete a vehicle by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(id);
  }
}

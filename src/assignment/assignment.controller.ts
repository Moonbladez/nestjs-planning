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
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto, UpdateAssignmentDto } from './dto';

@ApiTags('Assignment')
@Controller({ version: '1', path: 'assignment' })
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @ApiOperation({
    summary: 'Create a assignment',
  })
  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentService.create(createAssignmentDto);
  }

  @ApiOperation({
    summary: 'Get all assignments',
  })
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.assignmentService.findAll(paginationQuery);
  }

  @ApiOperation({
    summary: 'Get a assignment by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a assignment by id',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentService.update(id, updateAssignmentDto);
  }

  @ApiOperation({
    summary: 'Delete a assignment by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentService.remove(id);
  }
}

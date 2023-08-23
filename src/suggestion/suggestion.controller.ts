import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuggestionService } from './suggestion.service';

@ApiTags('Suggestion')
@Controller({ path: 'suggestion', version: '1' })
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) {}

  @ApiOperation({
    summary: 'Approve a suggestion and move it to assignment',
  })
  @Post(':id')
  create(@Param('id') suggestedId: string) {
    return this.suggestionService.approve(suggestedId);
  }

  @ApiOperation({
    summary: 'Get all suggestions',
  })
  @Get()
  findAll() {
    return this.suggestionService.findAll();
  }

  @ApiOperation({
    summary: 'Get a suggestion by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suggestionService.findOne(id);
  }

  @ApiOperation({
    summary: 'Do not approve of suggestion and delete it',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suggestionService.remove(id);
  }
}

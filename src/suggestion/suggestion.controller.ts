import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuggestionService } from './suggestion.service';

@ApiTags('Suggestion')
@Controller({ path: 'suggestion', version: '1' })
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) {}

  @Post(':id')
  create(@Param('id') suggestedId: string) {
    return this.suggestionService.approve(suggestedId);
  }

  @Get()
  findAll() {
    return this.suggestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suggestionService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suggestionService.remove(id);
  }
}

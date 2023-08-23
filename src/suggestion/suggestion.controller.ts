import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';
import { SuggestionService } from './suggestion.service';

@ApiTags('Suggestion')
@Controller('suggestion')
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) {}

  @Post()
  create(@Body() createSuggestionDto: CreateSuggestionDto) {
    return this.suggestionService.create(createSuggestionDto);
  }

  @Get()
  findAll() {
    return this.suggestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suggestionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSuggestionDto: UpdateSuggestionDto,
  ) {
    return this.suggestionService.update(+id, updateSuggestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suggestionService.remove(+id);
  }
}

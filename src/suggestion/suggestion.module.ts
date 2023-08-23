import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SuggestionSeedingService } from './suggestion-seeding.service';
import { SuggestionController } from './suggestion.controller';
import { SuggestionService } from './suggestion.service';

@Module({
  controllers: [SuggestionController],
  providers: [SuggestionService, SuggestionSeedingService, PrismaService],
})
export class SuggestionModule {}

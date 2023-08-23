import { fakerNB_NO } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { ASSIGNMENT_STATUS } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SuggestionSeedingService {
  constructor(private readonly prismaService: PrismaService) {}

  async seed() {
    const exsistingSuggestionCount =
      await this.prismaService.suggestion.count();

    if (exsistingSuggestionCount === 0) {
      const fakeSuggestions = Array.from({ length: 10 }, () => {
        const suggestionData = {
          status: ASSIGNMENT_STATUS.Suggested,
          startTime: fakerNB_NO.date.past({ years: 0.5 }),
          endTime: fakerNB_NO.date.future({ years: 0.5 }),
        };

        return suggestionData;
      });

      const seededSuggestions = await this.prismaService.suggestion.createMany({
        data: fakeSuggestions,
      });

      console.info('Seeded suggestions:', seededSuggestions);
    }
  }
}
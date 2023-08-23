import { fakerNB_NO } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { ASSIGNMENT_STATUS } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SuggestionSeedingService {
  private readonly SUGGESTION_COUNT = 10;
  private readonly SELECTION_PROBABILITY = 0.3;

  constructor(private readonly prismaService: PrismaService) {}

  private getRandomExistingItem<T>(items: T[]): T {
    return fakerNB_NO.helpers.arrayElement(items);
  }

  async seed(): Promise<void> {
    const existingSuggestionCount = await this.prismaService.suggestion.count();
    if (existingSuggestionCount > 0) return;

    const existingProjects = await this.prismaService.project.findMany();
    const existingOrders = await this.prismaService.order.findMany();

    const fakeSuggestions = Array.from(
      { length: this.SUGGESTION_COUNT },
      () => {
        const suggestionData: any = {
          status: ASSIGNMENT_STATUS.Suggested,
          startTime: fakerNB_NO.date.past({ years: 0.5 }),
          endTime: fakerNB_NO.date.future({ years: 0.5 }),
        };

        if (
          existingProjects.length > 0 &&
          Math.random() < this.SELECTION_PROBABILITY
        ) {
          suggestionData.fromProjectId =
            this.getRandomExistingItem(existingProjects).id;
        }

        if (
          existingProjects.length > 0 &&
          Math.random() < this.SELECTION_PROBABILITY
        ) {
          suggestionData.toProjectId =
            this.getRandomExistingItem(existingProjects).id;
        }

        if (
          existingOrders.length > 0 &&
          Math.random() < this.SELECTION_PROBABILITY
        ) {
          suggestionData.orderId =
            this.getRandomExistingItem(existingOrders).id;
        }

        return suggestionData;
      },
    );

    try {
      const seededSuggestions = await this.prismaService.suggestion.createMany({
        data: fakeSuggestions,
      });

      console.info('Seeded suggestions:', seededSuggestions);
    } catch (error) {
      console.error('Error while seeding suggestions:', error);
    }
  }
}

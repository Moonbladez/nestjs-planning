import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WhenController } from './when.controller';
import { WhenService } from './when.service';

@Module({
  controllers: [WhenController],
  providers: [WhenService, PrismaService],
})
export class WhenModule {}

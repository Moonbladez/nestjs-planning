import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';

@Module({
  controllers: [AssignmentController],
  providers: [AssignmentService, PrismaService],
})
export class AssignmentModule {}

import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { PrismaService } from './prisma/prisma.service';
import { ProjectModule } from './project/project.module';
import { WhenModule } from './when/when.module';
import { AssignmentModule } from './assignment/assignment.module';

@Module({
  imports: [OrderModule, ProjectModule, WhenModule, AssignmentModule],
  providers: [PrismaService],
})
export class AppModule {}

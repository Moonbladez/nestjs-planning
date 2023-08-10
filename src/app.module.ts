import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { OrderModule } from './order/order.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [OrderModule, ProjectModule],
  providers: [PrismaService],
})
export class AppModule {}

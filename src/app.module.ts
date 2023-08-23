import { Module } from '@nestjs/common';
import { AssignmentModule } from './assignment/assignment.module';
import { DriverModule } from './driver/driver.module';
import { OrderModule } from './order/order.module';
import { PrismaService } from './prisma/prisma.service';
import { ProjectModule } from './project/project.module';
import { SharedService } from './shared/shared.service';
import { SuggestionModule } from './suggestion/suggestion.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { WhenModule } from './when/when.module';

@Module({
  imports: [
    OrderModule,
    ProjectModule,
    WhenModule,
    AssignmentModule,
    VehicleModule,
    DriverModule,
    SuggestionModule,
  ],
  providers: [PrismaService, SharedService],
})
export class AppModule {}

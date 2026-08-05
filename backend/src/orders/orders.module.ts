import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderStatusGateway } from 'src/order-status/order-status.gateway';
import { OrderStatusSimulatorService } from 'src/order-status/order-status-simulator.service';

@Module({
  imports: [PrismaModule],
  providers: [OrdersService, OrderStatusGateway, OrderStatusSimulatorService],
  controllers: [OrdersController],
})
export class OrdersModule {}

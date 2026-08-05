import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { OrderStatusGateway } from './order-status/order-status.gateway';
import { OrderStatusSimulatorService } from './order-status/order-status-simulator.service';

@Module({
  imports: [PrismaModule, MenuModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService, OrderStatusGateway, OrderStatusSimulatorService],
})
export class AppModule {}

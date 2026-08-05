import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { OrderStatusGateway } from './order-status/order-status.gateway';
import { OrderStatusSimulatorService } from './order-status/order-status-simulator.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    MenuModule,
    OrdersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, OrderStatusGateway, OrderStatusSimulatorService],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { OrderStatus } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatusGateway } from './order-status.gateway';

const STATUS_FLOW: OrderStatus[] = [
  OrderStatus.RECEIVED,
  OrderStatus.PREPARING,
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.DELIVERED,
];

const STEP_DELAY_MS = 8000;

@Injectable()
export class OrderStatusSimulatorService {
  constructor(
    private prisma: PrismaService,
    private gateway: OrderStatusGateway,
  ) {}

  startSimulation(orderId: number) {
    let currentIndex = 0;

    const interval = setInterval(async () => {
      currentIndex++;
      if (currentIndex >= STATUS_FLOW.length) {
        clearInterval(interval);
        return;
      }

      const newStatus = STATUS_FLOW[currentIndex];

      await this.prisma.order.update({
        where: { id: orderId },
        data: { status: newStatus },
      });

      this.gateway.emitStatusUpdate(orderId, newStatus);
    }, STEP_DELAY_MS);
  }
}

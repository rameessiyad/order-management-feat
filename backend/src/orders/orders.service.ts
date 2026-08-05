import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from 'generated/prisma/enums';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    const menuItemIds = dto.items.map((i) => i.menuItemId);

    const menuItems = await this.prisma.menuItem.findMany({
      where: {
        id: { in: menuItemIds },
      },
    });

    if (menuItems.length !== menuItemIds.length)
      throw new BadRequestException('One ore more menu items not exist');

    const priceMap = new Map(menuItems.map((m) => [m.id, Number(m.price)]));

    let totalAmount = 0;
    const orderItemsData = dto.items.map((item) => {
      const price = priceMap.get(item.menuItemId)!;
      totalAmount += price * item.quantity;

      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        priceAtOrder: price,
      };
    });

    return this.prisma.order.create({
      data: {
        customerName: dto.customerName,
        address: dto.address,
        phone: dto.phone,
        totalAmount,
        items: { create: orderItemsData },
      },
      include: { items: { include: { menuItem: true } } },
    });
  }

  findAll() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { menuItem: true } } },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { menuItem: true } } },
    });
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return order;
  }

  async updateStatus(id: number, status: OrderStatus) {
    await this.findOne(id); // throws 404 if not found
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}

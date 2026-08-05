import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class OrderStatusGateway {
  @WebSocketServer()
  server: Server;

  // Client joins a "room" specific to their order id,
  // so we only send them updates for THEIR order.
  @SubscribeMessage('subscribeToOrder')
  handleSubscribe(
    @MessageBody() orderId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`order-${orderId}`);
  }

  // Called by the simulator service whenever an order's status changes
  emitStatusUpdate(orderId: number, status: string) {
    this.server.to(`order-${orderId}`).emit('orderStatusUpdate', {
      orderId,
      status,
    });
  }
}

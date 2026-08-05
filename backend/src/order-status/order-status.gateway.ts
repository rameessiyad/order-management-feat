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

  @SubscribeMessage('subscribeToOrder')
  handleSubscribe(
    @MessageBody() orderId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`order-${orderId}`);
  }
  emitStatusUpdate(orderId: number, status: string) {
    this.server.to(`order-${orderId}`).emit('orderStatusUpdate', {
      orderId,
      status,
    });
  }
}

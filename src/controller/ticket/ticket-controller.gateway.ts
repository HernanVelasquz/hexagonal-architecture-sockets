import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable, from, map } from 'rxjs';
import { Server } from 'socket.io';

import { TicketEntity, TicketService } from '../../domain';
import { BasicControllerGatEway } from '../abstract/basicController.gateway';
import { CreateTicketDto } from './dto';

@WebSocketGateway()
export class TicketControllerGatEway extends BasicControllerGatEway {
  @WebSocketServer()
  public server: Server;

  constructor(private readonly ticketService: TicketService) {
    super();
  }

  @SubscribeMessage('on-get-all-ticket')
  findAllTicket(): Observable<WsResponse<TicketEntity[]>> {
    return from(this.ticketService.findAllTicket()).pipe(
      map((item) => ({ event: 'on-get-all-ticket', data: item })),
    );
  }

  @SubscribeMessage('on-register-ticket')
  registerTicket(
    @MessageBody() data: CreateTicketDto,
  ): Observable<WsResponse<TicketEntity>> {
    return from(this.ticketService.registerTicket(data)).pipe(
      map((item) => ({ event: 'on-register-ticket', data: item })),
    );
  }
}

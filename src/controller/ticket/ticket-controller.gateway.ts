import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
  WsResponse,
} from '@nestjs/websockets';
import { Observable, catchError, from, map, throwError } from 'rxjs';
import { UseFilters, UsePipes } from '@nestjs/common';
import { Socket } from 'socket.io';

import { WSValidationPipe, WsExceptionFilter } from '../../infrastructure';
import { TicketEntity, TicketService } from '../../domain';
import { BasicControllerGatEway } from '../abstract/basicController.gateway';
import { CreateTicketDto } from './dto';

@WebSocketGateway()
@UseFilters(WsExceptionFilter)
export class TicketControllerGatEway extends BasicControllerGatEway {
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
  @UsePipes(WSValidationPipe)
  registerTicket(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: CreateTicketDto,
  ): Observable<WsResponse<TicketEntity>> {
    console.log(client.id);
    return from(this.ticketService.registerTicket(data)).pipe(
      map((item) => ({ event: 'on-register-ticket', data: item })),
      catchError(() =>
        throwError(
          () => this.server.emit('on-error', new WsException(`Error`)),
          // this.server.emit(`${client.id}`, new WsException(`Invalid data`)),
        ),
      ),
    );
  }
}

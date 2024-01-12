import { Inject, Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';

import { Repository_key } from 'src/infrastructure';
import { TicketEntity } from '../entities';
import { TicketRepository } from '../repositories';
import { ITicketService } from './interfaces';

@Injectable()
export class TicketService implements ITicketService {
  constructor(
    @Inject(Repository_key.TICKET)
    private readonly ticketRepository: TicketRepository,
  ) {}
  public findAllTicket(): Observable<TicketEntity[]> {
    return from(this.ticketRepository.getAllTickets());
  }
  public findTicketById(id: string): Observable<TicketEntity> {
    return from(this.ticketRepository.getTicketById(id));
  }
  public registerTicket(ticket: TicketEntity): Observable<TicketEntity> {
    return from(this.ticketRepository.createTicket(ticket));
  }
  public update(
    id: string,
    ticket: Partial<TicketEntity>,
  ): Observable<TicketEntity> {
    return from(this.ticketRepository.updateTicket(id, ticket));
  }
  public delete(id: string): Observable<boolean> {
    return from(this.ticketRepository.deleteTicket(id));
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { Repository } from 'typeorm';

import { TicketEntity, TicketRepository } from '../../domain';
import { TicketData } from './ticket.data';

@Injectable()
export class TicketAdapter implements TicketRepository {
  constructor(
    @InjectRepository(TicketData)
    private readonly ticketRepository: Repository<TicketData>,
  ) {}

  public getAllTickets(): Observable<TicketEntity[]> {
    return from(this.ticketRepository.find());
  }

  public getTicketById(id: string): Observable<TicketEntity> {
    return from(this.ticketRepository.findOneBy({ id })).pipe(
      catchError(() =>
        throwError(() => new NotFoundException(`Ticket By ${id}, not Found`)),
      ),
    );
  }

  public getTicketByUser(idUser: string): Observable<TicketEntity[]> {
    return from(this.ticketRepository.find({ where: { id: idUser } }));
  }

  public createTicket(ticket: TicketEntity): Observable<TicketEntity> {
    return from(this.ticketRepository.save(ticket)).pipe(
      catchError(() =>
        throwError(
          () => new InternalServerErrorException(`Error to register Ticket`),
        ),
      ),
    );
  }

  public updateTicket(
    id: string,
    ticket: Partial<TicketEntity>,
  ): Observable<TicketEntity> {
    return from(this.ticketRepository.update(id, ticket)).pipe(
      switchMap(() => this.getTicketById(id)),
      catchError(() =>
        throwError(
          () => new InternalServerErrorException(`Error to update Ticket`),
        ),
      ),
    );
  }

  public deleteTicket(id: string): Observable<boolean> {
    return from(this.ticketRepository.delete(id)).pipe(
      map((result) => result.affected > 0),
      catchError(() =>
        throwError(
          () => new InternalServerErrorException(`Error to delete Ticket`),
        ),
      ),
    );
  }
}

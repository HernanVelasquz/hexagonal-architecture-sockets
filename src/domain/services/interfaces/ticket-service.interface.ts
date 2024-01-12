import { Observable } from 'rxjs';
import { TicketEntity } from 'src/domain';

export interface ITicketService {
  findAllTicket(): Observable<TicketEntity[]>;
  findTicketById(id: string): Observable<TicketEntity>;
  registerTicket(ticket: TicketEntity): Observable<TicketEntity>;
  update(id: string, ticket: Partial<TicketEntity>): Observable<TicketEntity>;
  delete(id: string): Observable<boolean>;
}

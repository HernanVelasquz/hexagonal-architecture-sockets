import { Observable } from 'rxjs';
import { TicketEntity } from '../entities';

export interface TicketRepository {
  getAllTickets(): Observable<TicketEntity[]>;
  getTicketById(id: string): Observable<TicketEntity>;
  getTicketByUser(idUser: string): Observable<TicketEntity[]>;
  createTicket(ticket: TicketEntity): Observable<TicketEntity>;
  updateTicket(
    id: string,
    ticket: Partial<TicketEntity>,
  ): Observable<TicketEntity>;
  deleteTicket(id: string): Observable<boolean>;
}

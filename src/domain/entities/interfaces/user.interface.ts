import { TicketEntity } from '../ticket.entity';

export interface IUserEntity {
  id?: string;
  name: string;
  email: string;
  tickets?: TicketEntity[];
}

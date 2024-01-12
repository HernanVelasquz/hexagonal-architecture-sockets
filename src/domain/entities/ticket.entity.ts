import { TicketStatus, Priority } from 'src/infrastructure';
import { ITicketEntity } from './interfaces/ticket.interface';
import { UserEntity } from './user.entity';

export class TicketEntity implements ITicketEntity {
  readonly id?: string;
  readonly user: UserEntity;
  readonly title: string;
  readonly description: string;
  readonly status?: TicketStatus;
  readonly priority?: Priority;
}

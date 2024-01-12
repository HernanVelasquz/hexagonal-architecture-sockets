import { TicketStatus, Priority } from 'src/infrastructure';
import { UserEntity } from '../user.entity';

export interface ITicketEntity {
  id?: string;
  user: UserEntity;
  title: string;
  description: string;
  status?: TicketStatus;
  priority?: Priority;
}

import { IUserEntity } from './interfaces';
import { TicketEntity } from './ticket.entity';

export class UserEntity implements IUserEntity {
  readonly id?: string;
  readonly name: string;
  readonly email: string;
  readonly tickets?: TicketEntity[];
}

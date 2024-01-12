import { Priority, TicketStatus } from 'src/infrastructure';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ITicketEntity, UserEntity } from '../../domain';
import { BaseData } from '../base';
import { UserData } from '../user/user.data';

@Entity({ name: 'Tickets' })
export class TicketData extends BaseData implements ITicketEntity {
  @Column({
    name: 'Ticket Title',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    name: 'Description Ticket',
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  description: string;

  @Column({
    name: 'Status Ticket',
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  @Column({
    name: 'Status Priority',
    type: 'enum',
    enum: Priority,
    default: Priority.LOW,
  })
  priority: Priority;

  @ManyToOne(() => UserData, (user) => user.tickets, {})
  @JoinColumn({ name: 'User Id' })
  user: UserEntity;
}

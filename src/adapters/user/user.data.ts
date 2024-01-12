import { IUserEntity, TicketEntity } from 'src/domain';
import { BaseData } from '../base';
import { Column, Entity, OneToMany } from 'typeorm';
import { TicketData } from '../ticket';

@Entity({ name: 'Users' })
export class UserData extends BaseData implements IUserEntity {
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    name: 'User Name',
  })
  name: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  email: string;

  @OneToMany(() => TicketData, (ticket) => ticket.user)
  tickets?: TicketEntity[];
}

import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  TicketAdapter,
  TicketData,
  TicketModule,
  UserAdapter,
  UserData,
} from 'src/adapters';
import { Repository_key } from './config';
import { StorageModule } from './storage/storage.module';

@Global()
@Module({
  imports: [
    StorageModule,
    TypeOrmModule.forFeature([TicketData, UserData]),
    TicketModule,
  ],
  providers: [
    {
      provide: Repository_key.TICKET,
      useClass: TicketAdapter,
    },
    {
      provide: Repository_key.USER,
      useClass: UserAdapter,
    },
  ],
  exports: [Repository_key.TICKET, Repository_key.USER, TypeOrmModule],
})
export class SharedModule {}

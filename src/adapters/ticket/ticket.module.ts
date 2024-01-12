import { Module } from '@nestjs/common';

import { TicketAdapter } from './ticket.adapter';
import { TicketService } from '../../domain';
import { TicketControllerGatEway } from '../../controller';

@Module({
  providers: [TicketAdapter, TicketService, TicketControllerGatEway],
  exports: [TicketAdapter, TicketService, TicketControllerGatEway],
})
export class TicketModule {}

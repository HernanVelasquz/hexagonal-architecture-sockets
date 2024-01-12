import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './createTicket.dto';

export class UpdateTicketDto extends PartialType(
  OmitType(CreateTicketDto, ['id', 'user'] as const),
) {}

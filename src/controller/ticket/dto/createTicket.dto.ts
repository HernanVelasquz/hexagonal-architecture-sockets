import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { TicketEntity, UserEntity } from 'src/domain';
import { Priority, TicketStatus } from 'src/infrastructure';

export class CreateTicketDto extends TicketEntity {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @Transform(({ value }) => ('' + value).toUpperCase)
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @IsOptional()
  @Transform(({ value }) => ('' + value).toUpperCase)
  @IsEnum(TicketStatus)
  priority?: Priority;

  @IsString()
  @IsNotEmpty()
  user: UserEntity;
}

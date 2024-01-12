import { Module } from '@nestjs/common';
import { UserAdapter } from './user.adapter';
import { UserService } from 'src/domain/services/user.service';

@Module({
  providers: [UserAdapter, UserService],
  exports: [UserAdapter, UserService],
})
export class UserModule {}

import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { StorageConfigService } from './storage-config.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: StorageConfigService,
    }),
  ],
  exports: [TypeOrmModule],
})
export class StorageModule {}

import { Module } from '@nestjs/common';
import { SharedModule } from './infrastructure/shared.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseData {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly create_ad: Date;
}

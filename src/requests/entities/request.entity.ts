import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;
}

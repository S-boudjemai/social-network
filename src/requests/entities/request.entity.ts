import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  requester_id: number;

  @Column()
  content: string;

  @Column()
  title: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'treated'],
    default: 'pending',
  })
  status: 'pending' | 'in_progress' | 'treated';
}

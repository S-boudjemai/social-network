import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // Relation ManyToOne pour l'éxpéditeur du message
  @ManyToOne(() => User, (user) => user.sentMessages, { eager: true })
  sender: User;

  // Relation ManyToOne pour le destinataire du message
  @ManyToOne(() => User, (user) => user.receivedMessages, { eager: true })
  receiver: User;
}

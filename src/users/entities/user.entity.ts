import { Group } from 'src/groups/entities/groups.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Group, (group) => group.users)
  group: Group;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  // Liste des messages envoyés par cet utilisateur
  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  // Liste des messages reçus par cet utilisateur
  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];

  @Column({
    type: 'enum',
    enum: ['franchisee', 'franchisor'],
    default: 'franchisee',
  })
  role: 'franchisee' | 'franchisor';
}

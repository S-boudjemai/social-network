import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { RequestsModule } from './requests/requests.module';
import { PostModule } from './post/post.module';

import { User } from './users/entities/user.entity';
import { Group } from './groups/entities/groups.entity';
import { AuthModule } from './auth/auth.module';
import { Post } from './post/entities/post.entity';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/entities/message.entity';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    GroupsModule,
    RequestsModule,
    PostModule,
    GroupsModule,
    AuthModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

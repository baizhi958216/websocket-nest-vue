import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UserModule, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

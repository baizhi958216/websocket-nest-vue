import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { db } from 'lib/db';

@Injectable()
export class MessagesService {
  async create(createMessageDto: CreateMessageDto) {
    const message = await db.message.create({
      data: createMessageDto,
    });
    const username = await db.user.findUnique({
      where: {
        id: message.userId,
      },
      select: {
        username: true,
      },
    });
    return username ? Object.assign(message, username) : null;
  }
}

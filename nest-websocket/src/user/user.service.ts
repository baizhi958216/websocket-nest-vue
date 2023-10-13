import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { db } from 'lib/db';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const user = await db.user.create({
      data: createUserDto,
    });
    return user;
  }
}

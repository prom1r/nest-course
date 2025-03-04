import { Injectable } from '@nestjs/common';
import { users } from '../../mock/index';

@Injectable()
export class UsersService {
  getUsers(): object[] {
    return users;
  }
}

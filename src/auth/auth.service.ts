import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    username,
    password,
  }: AuthPayloadDto): Promise<User | null> {
    const findUser: User = await this.usersService.findByUsername(username);
    if (!findUser) {
      return null;
    }

    if (password === findUser.password) {
      const { password, ...userWithoutPassword } = findUser;
      return userWithoutPassword as User;
    }
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

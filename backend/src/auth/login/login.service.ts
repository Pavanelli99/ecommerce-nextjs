import { BadRequestException, Injectable } from '@nestjs/common';

import { UserService } from 'src/models/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== password) {
      throw new Error("Password doesn't match");
    }

    const payload = { email: user.email, sub: user.id };

    console.log(user);
    return {
      access_token: this.jwt.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '2h',
      }),
    };
  }

  checkToken(token: any) {
    try {
      const data = this.jwt.verify(token);
      const user = this.userService.findByEmail(data.email);
      // remove password from user object
      user.then((u) => delete u.password);
      return user;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}

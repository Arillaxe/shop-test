import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpUserDto } from 'src/user/user.dto';
import { UserService } from '../user/user.service';
import { SignInUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  getUserById(userId: number) {
    return this.userService.findById(userId);
  }

  async signIn(user: SignInUserDto) {
    const { email, password } = user;

    const foundUser = await this.userService.findByEmail(email);

    if (!foundUser || !(await foundUser.validatePassword(password))) {
      throw { message: 'Invalid login/password combination', status: 400 };
    }

    const accessToken = this.jwtService.sign(foundUser.toAuthJSON());

    return {
      user: foundUser.toAuthJSON(),
      accessToken,
    };
  }

  async signUpUser(user: SignUpUserDto) {
    const createdUser = await this.userService.signUp(user);
    const accessToken = this.jwtService.sign(createdUser.toAuthJSON(), { secret: process.env.JWT_SECRET });

    return {
      user: createdUser.toAuthJSON(),
      accessToken,
    };
  }
}

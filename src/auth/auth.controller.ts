import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SignInUserDto } from './auth.dto';
import { SignUpUserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req: Request & { user: { id: number } }) {
    try {
      return await this.authService.getUserById(req.user.id);
    } catch (e) {
      return e;
    }
  }

  @Post('signIn')
  async login(@Body() signInUserDto: SignInUserDto, @Res() res: Response) {
    try {
      const user = await this.authService.signIn(signInUserDto);

      res.status(200).json(user);
    } catch (e) {
      res.status(e.status).json(e);
    }
  }

  @Post('signUp')
  async register(@Body() createUserDto: SignUpUserDto) {
    try {
      return this.authService.signUpUser(createUserDto);
    } catch (e) {
      if (e.errors) {
        return {
          status: 400,
          message: e.errors.map((error) => error.message),
        };
      }

      return e;
    }
  }
}

import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { Query } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id?')
  @UseGuards(JwtAuthGuard)
  async login(
    @Res() res: Response,
    @Param('id') id: string,
    @Query() query,
  ): Promise<any> {
    try {
      if (id) {
        const user = await this.userService.findById(+id);

        res.json({ user: user.toAuthJSON() });
      } else {
        const { offset, limit } = query;
        const { users, total } = await this.userService.findAll({
          offset,
          limit,
        });

        res.json({ users: users.map((user) => user.toAuthJSON()), total });
      }
    } catch (e) {
      return e;
    }
  }
}

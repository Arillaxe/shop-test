import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.model';
import { SignUpUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private userModel: typeof User) {}

  findById(id: number): Promise<User> {
    return this.userModel.findOne<User>({ where: { id } });
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne<User>({ where: { email } });
  }

  async findAll({ offset = 0, limit = 50 } = {}): Promise<{
    users: User[];
    total: number;
  }> {
    const users = await this.userModel.findAll<User>({ offset, limit });
    const total = await this.userModel.count();

    return { users, total };
  }

  async signUp(userDto: SignUpUserDto) {
    const { password, ...withoutPassword } = userDto;
    const createdUser = await this.userModel.create({ ...withoutPassword });

    await createdUser.setPassword(password);

    return await createdUser.save();
  }

  delete(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}

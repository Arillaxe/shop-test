import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ItemModule,
    OrderModule,
  ],
})
export class AppModule {}

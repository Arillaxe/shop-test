import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { itemProviders } from './item.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ItemController],
  providers: [ItemService, ...itemProviders],
  exports: [ItemService],
})
export class ItemModule {}

import { Injectable, Inject } from '@nestjs/common';
import { CreateItemDto } from './item.dto';
import { Item } from './item.model';

@Injectable()
export class ItemService {
  constructor(@Inject('ITEM_MODEL') private itemModel: typeof Item) {}

  async findAll({ offset = 0, limit = 50 } = {}): Promise<{ items: Item[], total: number}> {
    const items = await this.itemModel.findAll<Item>({ offset, limit });
    const total = await this.itemModel.count();

    return { items, total };
  }

  async create(itemDto: CreateItemDto) {
    const createdItem = await this.itemModel.create(itemDto);

    return await createdItem.save();
  }

  delete(id: number) {
    return this.itemModel.destroy({ where: { id } });
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { CreateOrderDto } from './order.dto';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(@Inject('ORDER_MODEL') private orderModel: typeof Order) {}

  async findAll({ offset = 0, limit = 50 } = {}): Promise<{ orders: Order[], total: number}> {
    const orders = await this.orderModel.findAll<Order>({ offset, limit });
    const total = await this.orderModel.count();

    return { orders, total };
  }

  async create(orderDto: CreateOrderDto) {
    const createdOrder = await this.orderModel.create(orderDto);

    return await createdOrder.save();
  }

  delete(id: number) {
    return this.orderModel.destroy({ where: { id } });
  }
}

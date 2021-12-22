import { Order } from './order.model';

export const orderProviders = [
  {
    provide: 'ORDER_MODEL',
    useValue: Order,
  },
];

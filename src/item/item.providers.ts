import { Item } from './item.model';

export const itemProviders = [
  {
    provide: 'ITEM_MODEL',
    useValue: Item,
  },
];

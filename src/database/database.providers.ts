import { Sequelize } from 'sequelize-typescript';
import { Item } from 'src/item/item.model';
import { Order } from 'src/order/order.model';
import { User } from '../user/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });

      sequelize.addModels([User, Item, Order]);

      await sequelize.sync();

      return sequelize;
    },
  },
];

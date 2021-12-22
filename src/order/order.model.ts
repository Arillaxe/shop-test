import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Order extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  itemId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  obtaining: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  paying: string;
}

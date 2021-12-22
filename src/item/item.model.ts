import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Item extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  size: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  price: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  length: string;

  @Column({
    type: DataType.STRING,
  })
  sleeve: string;

  @Column({
    type: DataType.STRING,
  })
  country: string;

  @Column({
    type: DataType.STRING,
  })
  storeCount: string;

  @Column({
    type: DataType.STRING,
  })
  reserveCount: string;

  @Column({
    type: DataType.STRING,
  })
  providerCount: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  images: string[];

  @Column({
    type: DataType.ARRAY(DataType.JSON),
  })
  composition: [{ type: string, percentage: string }];
}

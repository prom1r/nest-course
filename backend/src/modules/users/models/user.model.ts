import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  // класс User будет представлять собой таблицу в базе данных
  @Column
  firstName: string;

  @Column
  userName: string;

  @Column
  password: string;

  @Column
  email: string;
}

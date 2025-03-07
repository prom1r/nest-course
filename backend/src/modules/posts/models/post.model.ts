import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/modules/users/models/user.model';

@Table
export class Post extends Model {
  @ForeignKey(() => User) // будет связан с моделью User
  user: User;

  @Column
  discription: string;
}

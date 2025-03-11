import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/models/user.model';

@Table
export class Post extends Model {
  @ForeignKey(() => User) // будет связан с моделью User
  userId: User;

  @Column
  discription: string;
}

//const postWithUser = await postRepository.findOne({
//   where: { id },
//   include: User
// });
// @BelongsTo(() => User) // будет иметь возможность получить данные из модели User
// author: User;

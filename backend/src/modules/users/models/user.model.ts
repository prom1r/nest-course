import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from 'src/modules/posts/models/post.model';

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

  // связь один ко многим
  @HasMany(() => Post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  posts: Post[];
}

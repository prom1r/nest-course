import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // используется для передачи конфигурации из файла .env
import { SequelizeModule } from '@nestjs/sequelize'; //после добавления в .env даных (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD)
import congigurations from 'src/configurations';
import { User } from '../users/models/user.model';
import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';
import { Post } from '../posts/models/post.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      // forRoot method используется что бы передать конфигурацию из файла .env
      isGlobal: true,
      load: [congigurations],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // после добавления в .env даных (DB_HOST...) позволяет использовать конфигурацию при помощи функции useFactory
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        autoLoadModels: true,
        synchronize: true,
        models: [User, Post],
      }),
    }),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

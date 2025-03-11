import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

// imports: [
//   UsersModule,
//   ConfigModule,
//   PassportModule,
//   JwtModule.registerAsync({
//     imports: [ConfigModule],
//     useFactory: async (configService: ConfigService) => ({
//       secret: configService.get('secret'),
//       signOptions: { expiresIn: configService.get('expire_jwt') },
//     }),
//     inject: [ConfigService],
//   }),
// ],

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('secret'),
        signOptions: { expiresIn: configService.get('expire_jwt') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { SignInUseCase } from './useCases/sign-in.usecase';
import { JwtModule } from '@nestjs/jwt';
import { IUserRepository } from '../users/repositories/user.repository';
import { UserPrismaRepository } from '../users/repositories/prisma/user.prisma.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [LoginController],
  providers: [
    SignInUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [],
})
export class LoginModule {}

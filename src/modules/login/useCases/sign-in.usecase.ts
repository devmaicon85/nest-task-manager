import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { IUserRepository } from '@/modules/users/repositories/user.repository';

@Injectable()
export class SignInUseCase {
  constructor(
    private jwtService: JwtService,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: SignInDto) {
    const { username, password } = data;

    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isEqualPassword = await compare(password, user.password);

    if (!isEqualPassword) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username,
    };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}

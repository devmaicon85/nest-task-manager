import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserCreateDTO } from '../dto/user.dto';

import { hash } from 'bcrypt';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name);

  constructor(private userRepository: IUserRepository) {}

  async execute(data: UserCreateDTO) {
    const { email, password, username } = data;

    const user = await this.userRepository.findByUsernameOrEmail({
      email,
      username,
    });

    if (user) {
      this.logger.error(`User ${email} or ${username} already exists`, data);
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const passwordHashed = await hash(password, 10);

    return await this.userRepository.save({
      ...data,
      password: passwordHashed,
    });
  }
}

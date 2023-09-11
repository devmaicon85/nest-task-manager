import { PrismaService } from 'src/infra/database/prisma.service';
import {
  UsernameAndEmail,
  UserListDTO,
  UserCreateDTO,
} from '@/modules/users/dto/user.dto';
import { IUserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByUsernameOrEmail(
    data: UsernameAndEmail,
  ): Promise<UserListDTO | null> {
    const { email, username } = data;
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    return user;
  }
  async findById(id: string): Promise<UserListDTO | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByUsername(username: string): Promise<UserListDTO | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  async save(data: UserCreateDTO): Promise<UserListDTO> {
    const user = await this.prisma.user.create({
      data: {
        ...data,
      },
    });

    return user;
  }

  async uploadAvatar(id: string, path: string): Promise<void> {
    await this.prisma.user.update({
      data: {
        avatarUrl: path,
      },
      where: {
        id,
      },
    });
  }
}

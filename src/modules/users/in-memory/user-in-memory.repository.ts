import { randomUUID } from 'crypto';
import { UsernameAndEmail, UserListDTO, UserCreateDTO } from '../dto/user.dto';
import { IUserRepository } from '../repositories/user.repository';

export class UserInMemoryRepository implements IUserRepository {
  users: UserListDTO[] = [];

  async findByUsernameOrEmail(
    data: UsernameAndEmail,
  ): Promise<UserListDTO | null> {
    const user = this.users.find(
      (user) => user.email === data.email || user.username === data.username,
    );

    return user ?? null;
  }
  async findById(id: string): Promise<UserListDTO | null> {
    const user = this.users.find((user) => user.id === id) ?? null;
    return user;
  }
  async findByUsername(username: string): Promise<UserListDTO | null> {
    const user = this.users.find((user) => user.username === username);
    return user ?? null;
  }
  async save(data: UserCreateDTO): Promise<UserListDTO> {
    const user: UserListDTO = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.users.push(user);

    return user;
  }
  uploadAvatar(id: string, path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

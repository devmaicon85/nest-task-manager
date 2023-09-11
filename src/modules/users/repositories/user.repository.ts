import { UserCreateDTO, UserListDTO, UsernameAndEmail } from '../dto/user.dto';

export abstract class IUserRepository {
  abstract findByUsernameOrEmail(
    data: UsernameAndEmail,
  ): Promise<UserListDTO | null>;

  abstract findById(id: string): Promise<UserListDTO | null>;
  abstract findByUsername(username: string): Promise<UserListDTO | null>;
  abstract save(data: UserCreateDTO): Promise<UserListDTO>;
  abstract uploadAvatar(id: string, path: string): Promise<void>;
}

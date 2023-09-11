import { Test } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user.usecase';
import { UserCreateDTO } from '../dto/user.dto';
import { IUserRepository } from '../repositories/user.repository';
import { UserInMemoryRepository } from '../in-memory/user-in-memory.repository';
import { AuthGuard } from '@/infra/providers/auth-guard.provider';

describe('CreateUserUserCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be able to create a new user', async () => {
    const data: UserCreateDTO = {
      name: 'teste',
      email: 'teste@teste.com.br',
      password: 'teste123',
      username: 'teste',
    };
    const result = await createUserUseCase.execute(data);

    expect(result).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email or username ', async () => {
    const data: UserCreateDTO = {
      name: 'teste',
      email: 'username_already_exists@teste.com.br',
      username: 'username_already_exists',
      password: 'teste123',
    };

    await createUserUseCase.execute(data);
    expect(createUserUseCase.execute(data)).rejects.toThrowError();
  });
});

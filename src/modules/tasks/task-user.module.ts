import { Module } from '@nestjs/common';
import { CreateTaskUserUseCase } from './useCases/create-task-user.usecase';
import { ITaskUserRepository } from './repositories/task-user.repository';
import { TaskUserController } from './task-user.controller';
import { TaskUsePrismaRepository } from './repositories/prisma/task-user.prisma.repository';

@Module({
  controllers: [TaskUserController],
  providers: [
    CreateTaskUserUseCase,
    {
      provide: ITaskUserRepository,
      useClass: TaskUsePrismaRepository,
    },
  ],
  exports: [],
})
export class TaskUserModule {}

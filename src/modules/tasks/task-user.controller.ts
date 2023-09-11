import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateTaskUserUseCase } from './useCases/create-task-user.usecase';
import { CreateTaskUserSchemaDTO } from './schemas/task-user.schema';
import { AuthGuard } from '@/infra/providers/auth-guard.provider';

@Controller('/tasks')
export class TaskUserController {
  constructor(private readonly createTaskUserUseCase: CreateTaskUserUseCase) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: CreateTaskUserSchemaDTO, @Request() req) {
    const task = await this.createTaskUserUseCase.execute({
      ...data,
      userId: req.user.sub,
    });

    return task;
  }
}

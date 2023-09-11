import { PrismaService } from '@/infra/database/prisma.service';
import {
  TaskUserNotificationDTO,
  TaskUserRequestDTO,
  TaskUserResponseDTO,
} from '../../dto/task-use.dto';
import { ITaskUserRepository } from '../task-user.repository';
import { Injectable } from '@nestjs/common';
import { EndOfDay, startOfDay } from '@/infra/utils/date';

@Injectable()
export class TaskUsePrismaRepository implements ITaskUserRepository {
  constructor(private prisma: PrismaService) {}
  async findAllStartDay(): Promise<TaskUserNotificationDTO[] | null> {
    const allTasks = await this.prisma.taskUser.findMany({
      where: {
        task: {
          startAt: {
            gte: startOfDay(),
            lte: EndOfDay(),
          },
        },
      },
      include: {
        task: {
          select: {
            startAt: true,
            endAt: true,
            title: true,
            description: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
            avatarUrl: true,
            createdAt: true,
          },
        },
      },
    });

    return allTasks;
  }
  async save(data: TaskUserRequestDTO): Promise<TaskUserResponseDTO> {
    const { userId, title, description, startAt, endAt, priority, status } =
      data;

    const task = this.prisma.taskUser.create({
      data: {
        task: {
          create: {
            description,
            endAt,
            startAt,
            title,
            priority,
            status,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return task;
  }
}

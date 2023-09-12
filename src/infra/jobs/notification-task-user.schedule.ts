import { ITaskUserRepository } from '@/modules/tasks/repositories/task-user.repository';
import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuthGuard } from '../providers/auth-guard.provider';
import { ClientKafka } from '@nestjs/microservices';

type MessageDTO = {
  email: string;
  startAt: Date;
  endAt: Date;
  userId: string;
  name: string;
  taskId: string;
  title: string;
  description: string;
};

@Injectable()
export class NotificationTaskUserSchedule {
  constructor(
    private taskRepository: ITaskUserRepository,
    @Inject('NOTIFICATION') private readonly notificationClient: ClientKafka,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  @UseGuards(AuthGuard)
  async getAllTasksDay() {
    const allTasks = await this.taskRepository.findAllStartDay();

    console.log('🚀🚀🚀 NOTIFICANDO 🚀🚀🚀');

    if (allTasks) {
      allTasks.forEach((item) => {
        const data: MessageDTO = {
          email: item.user.email,
          startAt: item.task.startAt,
          endAt: item.task.endAt,
          userId: item.user.id,
          name: item.user.name,
          taskId: item.taskId,
          title: item.task.title,
          description: item.task.description,
        };
        this.notificationClient.emit('tp_task_notification', {
          ...data,
        });
      });
    }
  }
}

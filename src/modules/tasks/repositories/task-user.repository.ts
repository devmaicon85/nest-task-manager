import {
  TaskUserNotificationDTO,
  TaskUserRequestDTO,
  TaskUserResponseDTO,
} from '../dto/task-use.dto';

export abstract class ITaskUserRepository {
  abstract save(data: TaskUserRequestDTO): Promise<TaskUserResponseDTO>;
  abstract findAllStartDay(): Promise<TaskUserNotificationDTO[] | null>;
}

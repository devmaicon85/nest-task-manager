export type TaskUserRequestDTO = {
  userId: string;
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  priority: 'BAIXA' | 'NORMAL' | 'ALTA';
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO';
};

export type TaskUserResponseDTO = {
  id: string;
};

type TaskDTO = {
  startAt: Date;
  endAt: Date;
  title: string;
  description: string;
};

type UserDTO = {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  createdAt: Date;
};
export type TaskUserNotificationDTO = {
  id: string;
  taskId: string;
  userId: string;
  createdAt: Date;
  task: TaskDTO;
  user: UserDTO;
};

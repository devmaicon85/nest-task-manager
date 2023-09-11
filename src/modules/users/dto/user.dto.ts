export type UserCreateDTO = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type UserUpdateDTO = Partial<UserCreateDTO>;

export type UserListDTO = UserCreateDTO & {
  id: string;
  createdAt: Date;
};

export type UsernameAndEmail = {
  username: string;
  email: string;
};

export type FileDTO = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
};

export type AvatarDTO = {
  file: FileDTO;
  idUser: string;
};

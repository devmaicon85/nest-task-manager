import { FileDTO } from '@/modules/users/dto/user.dto';

export abstract class IStorage {
  abstract upload(file: FileDTO, folder: string): Promise<SupabaseResponse>;
}

export type SupabaseResponse =
  | {
      data: { path: string };
      error: null;
    }
  | {
      data: null;
      error: any;
    };

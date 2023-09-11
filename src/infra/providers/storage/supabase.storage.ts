import { FileDTO } from '@/modules/users/dto/user.dto';
import { IStorage, SupabaseResponse } from './storage';

import { createClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupabaseStorage implements IStorage {
  private client = createClient(
    String(process.env.SUPABASE_URL),
    String(process.env.SUPABASE_KEY),
  );

  async upload(file: FileDTO, folder: string): Promise<SupabaseResponse> {
    const data = await this.client.storage
      .from(String(process.env.SUPABASE_BUCKET))
      .upload(`${folder}/${file.originalname}`, file.buffer, {
        upsert: true,
      });

    return data;
  }
}

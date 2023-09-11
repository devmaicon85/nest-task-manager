import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateTaskUserSchema = z.object({
  title: z.string().min(3, 'Must be at least 3 characters long'),
  description: z.string().min(3, 'Must be at least 3 characters long'),
  startAt: z.string().transform((val) => new Date(val)),
  endAt: z.string().transform((val) => new Date(val)),
  priority: z.enum(['BAIXA', 'NORMAL', 'ALTA']),
  status: z.enum(['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDO']),
});

export class CreateTaskUserSchemaDTO extends createZodDto(
  CreateTaskUserSchema,
) {}

// import { createZodDto } from 'nestjs-zod';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateUserSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  username: z.string().min(3, 'Must be at least 3 characters long'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Must be at least 6 characters long'),
});

export class CreateUserSchemaDTO extends createZodDto(CreateUserSchema) {}

export const UserResponseSchemaDTO = CreateUserSchema.omit({
  password: true,
});

export type UserResponseSchemaDTO = z.infer<typeof UserResponseSchemaDTO>;

import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { AuthGuard } from '../../infra/providers/auth-guard.provider';
import { ProfileUserUseCase } from './useCases/profile-user.usecase';
import {
  CreateUserSchema,
  CreateUserSchemaDTO,
  UserResponseSchemaDTO,
} from './schemas/user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dto/user.dto';
import { UploadAvatarUserUseCase } from './useCases/upload-avatar-user.usecase';
import { zodToOpenAPI } from 'nestjs-zod';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

const schemaUserSwagger = zodToOpenAPI(CreateUserSchema);

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
    private readonly uploadAvatarUserUseCase: UploadAvatarUserUseCase,
  ) {}

  @Post()
  @ApiBody({
    schema: schemaUserSwagger,
    description: 'Criação de usuário',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na criação do usuário',
  })
  async create(@Body() data: CreateUserSchemaDTO) {
    const user = await this.createUserUseCase.execute(data);

    return UserResponseSchemaDTO.parse(user);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  @ApiBearerAuth()
  async profile(@Request() req) {
    const profile = await this.profileUserUseCase.execute(req.user.sub);
    return UserResponseSchemaDTO.parse(profile);
  }

  @Patch('/avatar')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@Request() req, @UploadedFile() file: FileDTO) {
    const avatar = await this.uploadAvatarUserUseCase.execute({
      file,
      idUser: req.user.sub,
    });

    return avatar;
  }
}

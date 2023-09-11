import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(['debug', 'error', 'warn', 'log']);

  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('Api responsavel por gerenciar as tarefas de usuário')
    .setVersion('1.0')
    .addBearerAuth()
    .setContact(
      'DevMaicon',
      'https://github.com/devmaicon85',
      'devmaicon@gmail.com',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();

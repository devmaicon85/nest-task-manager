import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignInUseCase } from './useCases/sign-in.usecase';

@Controller('')
export class LoginController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('/signIn')
  @HttpCode(200)
  async signIn(@Body() data: SignInDto) {
    const token = await this.signInUseCase.execute(data);
    return token;
  }
}

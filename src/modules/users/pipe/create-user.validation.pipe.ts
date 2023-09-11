import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(
      '🚀 ~ file: create-user.validation.pipe.ts:6 ~ CreateUserValidationPipe ~ transform ~ metadata:',
      metadata,
    );
    return value;
  }
}

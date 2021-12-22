import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SignInUserDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

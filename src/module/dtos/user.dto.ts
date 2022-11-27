import { IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterDTO {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public confirmPassword: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class UserRegister {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

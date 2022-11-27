import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserRegisterDTO } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post('/register')
  register(@Body(new ValidationPipe()) userData: UserRegisterDTO) {
    return this.userService.register(userData);
  }
}

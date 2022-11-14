import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegister } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Get all user
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Register user
  async register(userData: UserRegister) {
    const { username, password } = userData;
    // password
    const hashPass = await bcrypt.hash(password, 3);
    // validate username
    const user = await this.userRepository.findOneBy({
      username: userData.username,
    });
    if (user) {
      throw new HttpException('Username already exist', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userRepository.create({
      username,
      password: hashPass,
    });
    return await this.userRepository.save(newUser);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { UserRegisterDTO } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

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
  async register(userData: UserRegisterDTO) {
    const { username, password, confirmPassword, email } = userData;
    const user = await this.userRepository.findOneBy({
      username,
    });
    if (user) {
      throw new HttpException('Username already exist', HttpStatus.BAD_REQUEST);
    }
    if (password !== confirmPassword) {
      throw new HttpException('Password should match', HttpStatus.BAD_REQUEST);
    }
    // password
    const hashPass = await bcrypt.hash(password, 3);
    // validate username
    const newUser = await this.userRepository.create({
      username,
      password: hashPass,
      email,
    });
    return await this.userRepository.save(newUser);
  }
}

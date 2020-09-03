import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { PublicUserDto } from '../tasks/dto/public-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
  }

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<PublicUserDto> {
    return this.userRepository.signUp(authCredentialsDto);
  }
}

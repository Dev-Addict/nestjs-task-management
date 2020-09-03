import { EntityRepository, Repository } from 'typeorm';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { PublicUserDto } from './dto/public-user.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<PublicUserDto> {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const user = new User();

    user.username = username;
    user.password = password;

    try {
      await user.save();
    } catch ({code}) {
      if (code === 23505)
        throw new ConflictException('Username already exists');
      throw new InternalServerErrorException();
    }

    const publicUserDto = new PublicUserDto();

    publicUserDto.id = user.id;
    publicUserDto.username = user.username;

    return publicUserDto;
  }
}
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { PublicUserDto } from './dto/public-user.dto';
import { BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const user = new User();

    const salt = await bcrypt.genSalt();

    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;

    try {
      await user.save();
    } catch ({ code }) {
      if (code === 23505)
        throw new ConflictException('Username already exists');
      throw new InternalServerErrorException();
    }

    const publicUserDto = new PublicUserDto();

    publicUserDto.id = user.id;
    publicUserDto.username = user.username;

    return publicUserDto;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<PublicUserDto> {
    const { username, password } = authCredentialsDto;

    const user = await this.findOne({username});

    if (user && await user.validatePassword(password))
      return {id: user.id, username: user.username};

    throw new BadRequestException('wrong username or password.');
  }
}
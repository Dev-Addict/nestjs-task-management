import { EntityRepository, Repository } from 'typeorm';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { PublicUserDto } from '../tasks/dto/public-user.dto';
import { bcryptConfig } from '../config/bcrypt.config';

@EntityRepository(User)
export class UserRepository extends Repository<PublicUserDto> {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const {username, password} = authCredentialsDto;

    const user = new User();

    user.username = username;
    user.password = password;

    await user.save();

    const publicUserDto = new PublicUserDto();

    publicUserDto.id = user.id;
    publicUserDto.username = user.username;

    return publicUserDto
  }
}
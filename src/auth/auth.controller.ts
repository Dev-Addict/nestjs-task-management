import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { PublicUserDto } from '../tasks/dto/public-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<PublicUserDto> {
    return this.authService.signUp(authCredentialsDto);
  }
}

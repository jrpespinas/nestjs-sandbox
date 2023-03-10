import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { STATUS_CODES } from 'http';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('sign-up')
  signup(@Body() DTO: AuthDTO) {
    return this.authService.signup(DTO);
  }

  @Post('login')
  login(@Body() DTO: AuthDTO) {
    return this.authService.login(DTO);
  }
}

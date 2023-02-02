import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signup(@Body() DTO: AuthDTO) {
    return this.authService.signup(DTO);
  }

  @Post('login')
  login(@Body() DTO: AuthDTO) {
    return this.authService.login(DTO);
  }
}

import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JWTGuard } from 'src/auth/guard';
import { APIResponse } from 'src/json-response';

@UseGuards(JWTGuard)
@Controller('users')
export class UserController {
  constructor() {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return APIResponse.success(HttpStatus.OK, {
      message: 'success',
      data: user,
    });
  }
}

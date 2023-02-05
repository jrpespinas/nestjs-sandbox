import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JWTGuard } from '../auth/guard';
import { APIResponse } from '../json-response';

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

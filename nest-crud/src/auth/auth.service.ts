import { HttpStatus, Injectable } from '@nestjs/common';
import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { APIResponse } from 'src/json-response';
import { AuthDTO } from './dto';
import { JWTHelpers } from './helpers/jwt.helper';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtHelper: JWTHelpers) {}

  /**
   * Creates a new user
   * @param {AuthDTO} dto - transfer object
   * @returns {APIResponse} success or error response json
   */
  async signup(dto: AuthDTO) {
    // Generate hash for the password before storing in the database
    const hash = await argon.hash(dto.password);

    // Add user to the database
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      const token = await this.jwtHelper.signToken(user.id, user.email);

      // Return success response
      return APIResponse.success(HttpStatus.OK, {
        data: token,
        message: 'here is your access token',
      });
    } catch (error) {
      // Throw user-friendly error message if error comes from prisma and is code P2002
      if (error.code == 'P2002')
        // return APIResponse.error('user already exist', HttpStatus.BAD_REQUEST);
        return APIResponse.error(HttpStatus.BAD_REQUEST, {
          message: 'user already exists',
        });

      // Throw generic error if otherwise
      return APIResponse.error(HttpStatus.BAD_REQUEST, {
        message: 'unable to add user',
      });
    }
  }

  /**
   * Creates a new user
   * @param {AuthDTO} dto - transfer object
   * @returns {APIResponse} success or error response json
   */
  async login(dto: AuthDTO) {
    // find user by email
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    // if user does not exist, throw error
    if (!user) {
      return APIResponse.error(HttpStatus.NOT_FOUND, {
        message: 'incorrect username or password',
      });
    }

    // verify password
    const passwordMatch = argon.verify(user.hash, dto.password);
    if (!passwordMatch) {
      return APIResponse.error(HttpStatus.NOT_FOUND, {
        message: 'incorrect username or password',
      });
    }

    const token = await this.jwtHelper.signToken(user.id, user.email);

    return APIResponse.success(HttpStatus.OK, {
      data: token,
      message: 'here is your access token',
    });
  }
}

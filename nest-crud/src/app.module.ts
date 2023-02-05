import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './users/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JobsModule,
    AuthModule,
  ],
  controllers: [UserController],
})
export class AppModule {}

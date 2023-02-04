import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JobsModule,
    AuthModule,
  ],
})
export class AppModule {}

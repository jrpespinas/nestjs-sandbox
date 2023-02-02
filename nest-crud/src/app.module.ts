import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [JobsModule, AuthModule],
})
export class AppModule {}

// auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthMiddleware } from './auth.middleware';
import { Admin } from '../admin/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])], // Import entities needed for authentication
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard], // Export AuthGuard to be used in other modules
})
export class AuthModule {}

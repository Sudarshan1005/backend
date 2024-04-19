import { Controller, Post, Body, UseGuards, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from 'src/admin/admin.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }): Promise<{ token: string }> {
    const { username, password } = credentials;
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = await this.authService.generateToken(user);
    return { token };
  }

  // Other admin routes...
}

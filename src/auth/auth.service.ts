import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET = 'your_secret_key';

  async validateUser(username: string, password: string): Promise<any> {
    const admin = { username: 'admin', password: await bcrypt.hash('password', 10) };

    if (username === admin.username && await bcrypt.compare(password, admin.password)) {
      return admin;
    }
    return null;
  }

  async generateToken(user: any): Promise<string> {
    return jwt.sign({ username: user.username }, this.JWT_SECRET, { expiresIn: '1h' });
  }

  async validateToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { Request as ExpressRequest } from 'express';

interface CustomRequest extends ExpressRequest {
    user?: any; 
  }

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    // Extract token from the request (e.g., from headers, cookies, etc.)
    const token = req.headers['authorization'];

    if (token) {
      try {
        const user = await this.authService.validateToken(token);
        if (user) {
          // Attach user information to the request object for further processing in route handlers
          req.user = user;
          return next();
        }
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    }

    throw new UnauthorizedException('Token not provided');
  }
}

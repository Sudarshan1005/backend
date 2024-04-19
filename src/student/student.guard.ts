
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class StudentGuard extends AuthGuard {
  canActivate(context: ExecutionContext): boolean {
    // Assuming 'student' is the role for students
    return super.canActivate(context) && context.switchToHttp().getRequest().user.role === 'student';
  }
}
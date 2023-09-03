import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AdminSelfGuard implements CanActivate {
  constructor(private readonly jwtService:JwtService){}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()

    if (req.user.roles.includes('SUPERADMIN')) {
      return true;
    }

    if (String(req.user.id) !== req.params.id) {
      throw new ForbiddenException({
        message: 'You don\'t have such rights!',
      });
    }
    return true;
  }
}
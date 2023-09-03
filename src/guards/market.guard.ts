import { BadGatewayException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Market } from "src/market/model/market.model";

@Injectable()
export class MarketGuard implements CanActivate {
  constructor(private readonly jwtService:JwtService){}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Market unauthorized!');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    console.log(token);
    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('Market unauthorized!');
    }

    async function verify(token:string, jwtService:JwtService) {
      const market: Partial<Market> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY
      })
      if (!market) {
        throw new UnauthorizedException('Invalid token provided!');
      }
      if (!market.is_active) {
        throw new UnauthorizedException('Market is not active!');
      }

      return true
    }

    return verify(token, this.jwtService);
  }
}
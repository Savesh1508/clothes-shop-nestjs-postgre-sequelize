// import { Module, forwardRef } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { ClientModule } from '../client/client.module';
// import { JwtModule } from "@nestjs/jwt";
// import { MarketModule } from '../market/market.module';
// import { AdminModule } from '../admin/admin.module';
// import { Client } from '../client/model/client.model';
// import { Market } from '../market/model/market.model';
// import { Admin } from '../admin/model/admin.model';

// @Module({
//   imports: [
//     forwardRef(() => ClientModule),
//     forwardRef(() => MarketModule),
//     forwardRef(() => AdminModule),
//     JwtModule.register({
//       global: true,
//       secret: process.env.ACCESS_TOKEN_KEY,
//       signOptions: {
//         expiresIn: '24h'
//       },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, Client, Market, Admin],
//   exports: [AuthService]
// })
// export class AuthModule {}

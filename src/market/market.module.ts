import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Market } from './model/market.model';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { Role } from 'src/roles/model/role.model';
import { RolesModule } from 'src/roles/roles.module';
import { MarketRoles } from 'src/roles/model/market-roles.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Market, Role, MarketRoles]),
    // JwtModule.register({}),
    MailModule,
    RolesModule
  ],
  controllers: [MarketController],
  providers: [MarketService, JwtService],
  exports: [MarketService]
})
export class MarketModule {}





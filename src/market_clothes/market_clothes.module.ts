import { Module } from '@nestjs/common';
import { MarketClothesService } from './market_clothes.service';
import { MarketClothesController } from './market_clothes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MarketClothes } from './model/market_clothes.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([MarketClothes]),
  ],
  controllers: [MarketClothesController],
  providers: [MarketClothesService, JwtService]
})
export class MarketClothesModule {}
